import pkg from '@iota/sdk';
const { 
    Client, 
    SecretManager,
    Utils,
} = pkg;
import pkg_id from "@iota/identity-wasm/node/index.js";
const {
    CoreDocument,
    IotaDocument,
    IotaIdentityClient,
    JwkMemStore,
    JwsAlgorithm,
    KeyIdMemStore,
    MethodRelationship,
    MethodScope,
    Service,
    Storage,
    Resolver,
    Timestamp,
    VerificationMethod,
} = pkg_id;

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Use this external package to avoid implementing the entire did:key method in this example.
import * as ed25519 from "@transmute/did-key-ed25519";

// The API endpoint of an IOTA node, e.g. Hornet.
const API_ENDPOINT = "http://140.112.18.206:14265";

// stronghold configuration
const strongholdPath = '../client.stronghold';
const password = process.env.STRONGHOLD_PASSWORD;

// Demonstrates how to set up a resolver using custom handlers.
export async function updateDID(didKey, concertName, seat, price) {
    console.log("passworrd:", password);
    // Set up a handler for resolving Ed25519 did:key
    const keyHandler = async function(didkey){
        let document = await ed25519.resolve(
            didkey,
            { accept: "application/did+ld+json" },
        );
        return CoreDocument.fromJSON(document.didDocument);
    };

    // Create a new Client to interact with the IOTA ledger.
    const client = new Client({
        primaryNode: API_ENDPOINT,
        localPow: true,
    });
    const didClient = new IotaIdentityClient(client);

    const strongholdConfig = {
        stronghold: {
            password: password,
            snapshotPath: strongholdPath,
        },
    };
    // open stronghold file
    const strongholdSecretManager = new SecretManager(strongholdConfig);

    // Construct a Resolver capable of resolving the did:key and iota methods.
    let handlerMap = new Map();
    handlerMap.set("key", keyHandler);

    const resolver = new Resolver(
        {
            client: didClient,
            handlers: handlerMap,
        },
    );

    // A valid Ed25519 did:key value taken from https://w3c-ccg.github.io/did-method-key/#example-1-a-simple-ed25519-did-key-value.
    // const didKey = "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK";
    // Also, we can use the DID we create in Lab 10 (Problem 4!)
    // const didKey = "did:iota:tst:0xef390554159e55733ab9e3dc3f7538d56007e04d2fd4641a648e52427d16bf79";
    // We use the DID that we have created before (stroed at .env)
    // const didKey = process.env.DID_;

    // Resolve didKey into a DID document.
    const document = await resolver.resolve(didKey);

    // Check that the types of the resolved documents match our expectations:
    // console.log(didKeyDoc.constructor.name);
    if (document instanceof IotaDocument) {
        console.log("Resolved DID Key document:", JSON.stringify(document, null, 2));
    } else {
        throw new Error(
            "the resolved document type should match the output type of keyHandler",
        );
    }

    // update
    // const storage = new Storage(new JwkMemStore(), new KeyIdMemStore());
    // // 1. Insert a new Ed25519 verification method in the DID document.
    // await document.generateMethod(
    //     storage,
    //     JwkMemStore.ed25519KeyType(),
    //     JwsAlgorithm.EdDSA,
    //     "#key-2",
    //     MethodScope.VerificationMethod(),
    // );

    // console.log("Document:", document.id());


    // 2. Attach a new method relationship to the inserted method.
    // document.attachMethodRelationship(document.id().join("#key-2"), MethodRelationship.Authentication);
    // document.attachMethodRelationship(document.id().join("#key-2"), MethodRelationship.Authentication);

    // 3. Add a new Service.
    const link = "#" + price;

    const service = new Service({
        id: document.id().join(link),
        type: "LinkedDomains",
        serviceEndpoint: "https://iota.org/",
        properties:{
            concert: concertName,
            seat: seat,
            price: price,
        }
    });
    document.insertService(service);

    document.setMetadataUpdated(Timestamp.nowUTC());

    // Resolve the latest output and update it with the given document.
    let aliasOutput = await didClient.updateDidOutput(document);

    // Because the size of the DID document increased, we have to increase the allocated storage deposit.
    // This increases the deposit amount to the new minimum.
    const rentStructure = await didClient.getRentStructure();

    aliasOutput = await client.buildAliasOutput({
        ...aliasOutput,
        amount: Utils.computeStorageDeposit(aliasOutput, rentStructure),
        aliasId: aliasOutput.getAliasId(),
        unlockConditions: aliasOutput.getUnlockConditions(),
    });

    // Publish the output.
    const updated_document = await didClient.publishDidOutput(strongholdConfig, aliasOutput);
    console.log("Updated DID document:", JSON.stringify(updated_document, null, 2));
}

// await updateDID("did:iota:tst:0x3bc9d60791a45bbe2951f7cad0ea7a98d309b1e7b087d7be69bda0353a05aff7", "Show_what_i_have", "A34b", "200").then(() => process.exit());