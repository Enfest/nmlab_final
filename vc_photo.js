import pkg from '@iota/sdk';
import pkg_id from "@iota/identity-wasm/node/index.js";
import { iotaResolution } from './resolveDID.js';
import dotenv from 'dotenv';
const { 
    Client, 
    SecretManager,
    Utils,
} = pkg;

const {
    CoreDocument,
    Credential,
    EdDSAJwsVerifier,
    FailFast,
    IotaDocument,
    IotaIdentityClient,
    Jwk,
    JwkType,
    JwkMemStore,
    JwsAlgorithm,
    JwsSignatureOptions,
    JwtCredentialValidationOptions,
    JwtCredentialValidator,
    KeyIdMemStore,
    MethodDigest,
    MethodRelationship,
    MethodScope,
    Service,
    Storage,
    Resolver,
    Timestamp,
    VerificationMethod,
} = pkg_id;


dotenv.config({ path: '../.env' });



// The API endpoint of an IOTA node, e.g. Hornet.


export async function vc_photo(didKey, photoInput, nameInput){
    const API_ENDPOINT = "http://140.112.18.206:14265";
    // const issuerDID = process.env.DID_EXAMPLE;
    const issuerDID = process.env.DID_ISSUER;
    const issuerDocument = await iotaResolution(issuerDID);
    // console.log(issuerDocument.toJSON());

    // const subjectDID = "did:iota:tst:0xd212c12870617317073cf6859d517d5d6024372a772f88a43bb9d0e933de744d"
    // const subjectDID = "did:iota:tst:0xae010b9df3261a233ac572246ca98bd098f415cd1b9611129606f17a0111f62e";
    const subjectDocument = await iotaResolution(didKey);


    // Create a credential subject indicating the degree earned by Alice, linked to their DID.
    const subject = {
        id: subjectDocument.id(),
        name: nameInput,
        degreeName: "Bachelor of Science and Arts",
        degreeType: "BachelorDegree",
        GPA: "4",
        Photo: photoInput,
    };

    // Create an unsigned `UniversityDegree` credential for Alice
    const unsignedVc = new Credential({
        id: "https://example.edu/credentials/3732",
        type: "UniversityDegreeCredential",
        issuer: issuerDocument.id(),
        credentialSubject: subject,
    });

    console.log("unsignedVC:", unsignedVc);

    // const [_did, issuerFragment] = issuerDID.split("#");
    const issuerFragment = "key-1";
    
    // ======================================
    // Storage problem
    // Create method Digest
    // console.log(issuerDocument.methods()[0]);
    const methodDigest = new MethodDigest(issuerDocument.methods()[0]);

    // without private key
    const _jwk_data = ((issuerDocument.methods()[0]).data().toJSON()).publicKeyJwk;
    // add private key (but how to access private key???)
    const jwk_data = {
        ..._jwk_data,
        // hardcode, think a way to store it.
        d: "ka3A_dw2XW7inJ0DrLp30GfhCxsLG8QOU6oLphd7OFA",
    };
    // console.log(jwk_data);

    // Create jwk object, JwkMemStore
    const jwk = new Jwk(jwk_data);
    const jwkstore = new JwkMemStore();

    // this will randomly generate a keyID
    const keyID = await jwkstore.insert(jwk);

    // create KeyIDdMemStore
    const keyidstore = new KeyIdMemStore();
    keyidstore.insertKeyId(methodDigest, keyID);

    // Create issuer Storage
    const issuerStorage = new Storage(jwkstore, keyidstore);
    // console.log(issuerStorage.keyIdStorage());
    // console.log(issuerStorage.keyStorage());
    // ======================================
    
    // Create signed JWT credential.
    console.log("FR", issuerFragment);

    // console.log("HI", issuerDocument.toJSON());
    console.log("HI", issuerDocument.toString());
    const credentialJwt = await issuerDocument.createCredentialJwt(
        issuerStorage,
        issuerFragment,
        unsignedVc,
        new JwsSignatureOptions(),
    );

    console.log(credentialJwt.toJSON());

    // const res = new JwtCredentialValidator(new EdDSAJwsVerifier()).validate(
    //     credentialJwt,
    //     issuerDocument,
    //     new JwtCredentialValidationOptions(),
    //     // FailFast.FirstError,
    //     FailFast.AllErrors,
    // );
    // console.log("credentialjwt validation", res.intoCredential());
    return ({
        credentialJwt: credentialJwt.toString(),
        didKey: didKey,
    });
}
// await vc_photo(
// "did:iota:tst:0xc26548185ac0a4dd151d45f4e4cbe551d5dada4bdb0b6078a5e5b2ef1a159fd0",
// "ufhweiluwhhfehfuiwehfqwhfqwkjehfwqkluhfweilquhfwiuqfheiwuhfewiuhf",
// "John Doe").then(() => process.exit()).catch(console.error);
