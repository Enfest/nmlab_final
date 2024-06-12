import pkg_id from "@iota/identity-wasm/node/index.js";
const {
    Duration,
    Jwk,
    JwkMemStore,
    JwsSignatureOptions,
    Jwt,
    JwtPresentationOptions,
    KeyIdMemStore,
    MethodDigest,
    Presentation,
    Storage,
    Timestamp,
} = pkg_id;

import { iotaResolution } from './resolveDID.js';

// The API endpoint of an IOTA node, e.g. Hornet.
const API_ENDPOINT = "http://140.112.18.206:14265";

export async function createVP(nonce, subjectDID, subjectPrivateKey, subjectJwtString){

    const subjectDocument = await iotaResolution(subjectDID);
    const subjectFragment = "key-1";

    // Create method Digest
    const subjectMethodDigest = new MethodDigest(subjectDocument.methods()[0]);

    const _subject_jwk_data = ((subjectDocument.methods()[0]).data().toJSON()).publicKeyJwk;
    const subject_jwk_data = {
        ..._subject_jwk_data,
        d: subjectPrivateKey,
    };

    // Create jwk object, JwkMemStore
    const subjectJwk = new Jwk(subject_jwk_data);
    const subjectJwkStore = new JwkMemStore();
    const subjectKeyID = await subjectJwkStore.insert(subjectJwk);

    // create KeyIDdMemStore
    const subjectKeyIDStore = new KeyIdMemStore();
    subjectKeyIDStore.insertKeyId(subjectMethodDigest, subjectKeyID);

    // Create subject Storage
    const subjectStorage = new Storage(subjectJwkStore, subjectKeyIDStore);

    // Set expire time
    const expires = Timestamp.nowUTC().checkedAdd(Duration.minutes(10));

    // Create a Verifiable Presentation from the Credential
    const credentialJwt = new Jwt(subjectJwtString);
    const unsignedVp = new Presentation({
        holder: subjectDocument.id(),
        verifiableCredential: [credentialJwt],
        metadata: {
            purpose: "IVE concert: Show What I Have",
            price: "6600"
        }
    });

    // Create a JWT verifiable presentation using the holder's verification method
    // and include the requested challenge and expiry timestamp.
    const presentationJwt = await subjectDocument.createPresentationJwt(
        subjectStorage,
        subjectFragment,
        unsignedVp,
        new JwsSignatureOptions({ nonce }),
        new JwtPresentationOptions({ expirationDate: expires }),
    );

    // console.log(presentationJwt.toString());
    
    console.log("Challenge completed.");

    return (presentationJwt.toString());
}

// // ================ SAMPLE USAGE ===================
// const nonce = "475a7984-1bb5-4c4c-a56f-822bccd46440";
// const subjectDID = "did:iota:tst:0xa56fe23d28d2566f9b7231f30eec6939eefc57efc1c56302cacdb6877553c839";
// const subjectPrivateKey = "whvQT8vwAdNl05cyNTvZWWU72JYjpXvKVmzdbYHx8qE";
// const credentialJwtString = "eyJraWQiOiJkaWQ6aW90YTp0c3Q6MHgxNjFlYWZkMDc5N2FkNzhiODg5MTQ3N2M4OTMyZGEzZjAwMjJhZmM5NTZjNzdhY2NjNjlkNGQ4OTJiZDFmMTc2I2tleS0xIiwidHlwIjoiSldUIiwiYWxnIjoiRWREU0EifQ.eyJpc3MiOiJkaWQ6aW90YTp0c3Q6MHgxNjFlYWZkMDc5N2FkNzhiODg5MTQ3N2M4OTMyZGEzZjAwMjJhZmM5NTZjNzdhY2NjNjlkNGQ4OTJiZDFmMTc2IiwibmJmIjoxNzE4MTQyMzIyLCJqdGkiOiJodHRwczovL2V4YW1wbGUuZWR1L2NyZWRlbnRpYWxzLzM3MzIiLCJzdWIiOiJkaWQ6aW90YTp0c3Q6MHhjMjY1NDgxODVhYzBhNGRkMTUxZDQ1ZjRlNGNiZTU1MWQ1ZGFkYTRiZGIwYjYwNzhhNWU1YjJlZjFhMTU5ZmQwIiwidmMiOnsiQGNvbnRleHQiOiJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJVbml2ZXJzaXR5RGVncmVlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJCaXJ0aGRheSI6IjE5OTktMDEtMDEiLCJDRU8iOiJDUyBLdW8iLCJHUEEiOiI0IiwiZGVncmVlTmFtZSI6IkJhY2hlbG9yIG9mIFNjaWVuY2UgYW5kIEFydHMiLCJkZWdyZWVUeXBlIjoiQmFjaGVsb3JEZWdyZWUiLCJuYW1lIjoiU2FtIn19fQ.X0bvRum9A_9i_TYjC3YJh-H8HdZNb5bHZ7PWjPx0WxuV5ovOBa8EX4HA8YzLjqFpWT6Du4nNKC78bFPnWQsDDA";

// console.log(await validateVP(nonce, subjectDID, subjectPrivateKey, credentialJwtString));
// process.exit();
// // ================ SAMPLE USAGE ===================