import { SecretManager, initLogger } from '@iota/sdk';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// The path of stronghold
const STRONGHOLD_PATH = "client.stronghold"

// Get the Bech32 human-readable part (HRP) of the network.
// If you want to include client, uncommment the following lines.
// Since we have known that HRP is "tst", we simply return "tst" here.
// async function getHRP(){
//     const network_info = await iotaClient.getNetworkInfo();
//     const bech32Hrp = network_info.protocolParameters.bech32Hrp;
//     return bech32Hrp;
// }

function getHRP(){
    return "tst";
}

// In this example we will store a mnemonic in the Stronghold vault and generate an address
async function run() {
    // initLogger();

    try {
        for (const envVar of ['MNEMONIC', 'STRONGHOLD_PASSWORD']) {
            if (!(envVar in process.env)) {
                throw new Error(`.env ${envVar} is not defined`);
            }
        }
        const strongholdSecretManager = new SecretManager({
            stronghold: {
                password: process.env.STRONGHOLD_PASSWORD,
                snapshotPath: STRONGHOLD_PATH,
            },
        });

        // A mnemonic can be generated with `Utils.generateMnemonic()`.
        // Store the mnemonic in the Stronghold snapshot, this needs to be done only the first time.
        // The mnemonic can't be retrieved from the Stronghold file, so make a backup in a secure place!
        await strongholdSecretManager.storeMnemonic(
            process.env.MNEMONIC
        );

        const networkHrp = getHRP();

        const address = await strongholdSecretManager.generateEd25519Addresses({
            accountIndex: 0,
            range: {
                start: 0,
                end: 1,
            },
            bech32Hrp: networkHrp,
        });

        console.log('First public address (Wallet address):', address, '\n');
    } catch (error) {
        console.error('Error: ', error);
    }
}

run().then(() => process.exit());