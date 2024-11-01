import pkg from '@iota/sdk';
import pkg_id, { Jwk } from "@iota/identity-wasm/node/index.js";
import dotenv from 'dotenv';
const { 
    Client, 
    SecretManager,
    Utils,
} = pkg;

const {
    IotaDocument,
    IotaIdentityClient,
    JwkMemStore,
    JwsAlgorithm,
    KeyIdMemStore,
    MethodScope,
    Storage, 
    Timestamp,
} = pkg_id;


dotenv.config({ path: '../.env' });

export async function createDID(){
    // The API endpoint of an IOTA node, the Hornet.
    const API_ENDPOINT = "http://140.112.18.206:14265";

    // The faucet endpoint allows requesting funds for testing purposes.
    const FAUCET_ENDPOINT = "http://140.112.18.206:8091/api/enqueue";

    // Define IClientOptions
    const clientOptions = {
        nodes: [API_ENDPOINT], // provide an API endpoint to connect to IOTA node
        // localPow: true
    };
    
    // stronghold configuration
    const strongholdPath = '../client.stronghold';
    const password = process.env.STRONGHOLD_PASSWORD;
    // ============================================================================
    // Functions
    // Get the Bech32 human-readable part (HRP) of the network.
    async function getHRP(iotaClient){
        const network_info = await iotaClient.getNetworkInfo();
        const bech32Hrp = network_info.protocolParameters.bech32Hrp;
        return bech32Hrp;
    }

    // ============================================================================
    // Main

    const iotaClient = new Client(clientOptions);
    const didClient = new IotaIdentityClient(iotaClient);

    const strongholdConfig = {
        stronghold: {
            password: password,
            snapshotPath: strongholdPath,
        },
    };
    // open stronghold file
    const strongholdSecretManager = new SecretManager(strongholdConfig);
    // console.log(strongholdSecretManager);
    const networkHrp = await getHRP(iotaClient);
    console.log(password);
    const walletAddressBech32 = (await strongholdSecretManager.generateEd25519Addresses({
        accountIndex: 0,
        range: {
            start: 0,
            end: 1,
        },
        bech32Hrp: networkHrp,
    }))[0];
    
    console.log(walletAddressBech32);
    // console.log("fuck");
    // request funds for testing.
    console.log(await iotaClient.requestFundsFromFaucet(FAUCET_ENDPOINT, walletAddressBech32));


    // Create DID
    const document = new IotaDocument(networkHrp);
    const storage = new Storage(new JwkMemStore(), new KeyIdMemStore());


    // Insert a new Ed25519 verification method in the DID document.
    await document.generateMethod(
        storage,
        JwkMemStore.ed25519KeyType(),
        JwsAlgorithm.EdDSA,
        "#key-1",
        MethodScope.VerificationMethod(),
    );

    console.log(storage.keyIdStorage());
    const Key = storage.keyStorage()._keys.values().next().value;
    console.log(Key.toJSON().d);

    // document.setMetadataCreated(Timestamp.nowUTC());
    // document.setMetadataUpdated(Timestamp.nowUTC());

    // Construct an Alias Output containing the DID document, with the wallet address
    // set as both the state controller and governor.
    const address = Utils.parseBech32Address(walletAddressBech32);
    const aliasOutput = await didClient.newDidOutput(address, document);
    // console.log("Storage", storage.KeyIdMemStore);
    console.log("Alias Output:", JSON.stringify(aliasOutput, null, 2));
    
    // Publish the Alias Output and get the published DID document.
    const published = await didClient.publishDidOutput(strongholdConfig, aliasOutput);
    console.log("Published DID document:", JSON.stringify(published, null, 2));
    return ({
        privateKey: Key.toJSON().d,
        didKey: published.toJSON().id,
    });
}

// const personalData = await createDID();
// console.log("return",personalData);