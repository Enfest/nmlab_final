import pkg from '@iota/sdk';
const { 
    Client, 
} = pkg;
import pkg_id from "@iota/identity-wasm/node/index.js";
const {
    EdDSAJwsVerifier,
    FailFast,
    IotaIdentityClient,
    JwsVerificationOptions,
    Jwt,
    JwtCredentialValidationOptions,
    JwtCredentialValidator,
    JwtPresentationValidationOptions,
    JwtPresentationValidator,
    SubjectHolderRelationship,
    Resolver,
} = pkg_id;

// The API endpoint of an IOTA node, e.g. Hornet.
const API_ENDPOINT = "http://140.112.18.206:14265";

export async function validateVP(nonce, proofJwkString){

    const presentationJwt = new Jwt(proofJwkString);

    // Verifier receives the Verifiable Presentation and verifies it.
    const jwtPresentationValidationOptions = new JwtPresentationValidationOptions(
        {
            presentationVerifierOptions: new JwsVerificationOptions({ nonce }),
        },
    );

    const client = new Client({
        primaryNode: API_ENDPOINT,
        localPow: true,
    });
    const didClient = new IotaIdentityClient(client);

    const resolver = new Resolver({
        client: didClient,
    });

    // Resolve the presentation holder.
    const presentationHolderDID = JwtPresentationValidator.extractHolder(presentationJwt);
    const resolvedHolder = await resolver.resolve(
        presentationHolderDID.toString(),
    );

    // Validate presentation. Note that this doesn't validate the included credentials.
    let decodedPresentation = new JwtPresentationValidator(new EdDSAJwsVerifier()).validate(
        presentationJwt,
        resolvedHolder,
        jwtPresentationValidationOptions,
    );

    // Validate the credentials in the presentation.
    let credentialValidator = new JwtCredentialValidator(new EdDSAJwsVerifier());
    let validationOptions = new JwtCredentialValidationOptions({
        subjectHolderRelationship: [
            presentationHolderDID.toString(),
            SubjectHolderRelationship.AlwaysSubject,
        ],
    });

    let jwtCredentials = decodedPresentation
        .presentation()
        .verifiableCredential()
        .map((credential) => {
            const jwt = credential.tryIntoJwt();
            if (!jwt) {
                throw new Error("expected a JWT credential");
            } else {
                return jwt;
            }
        });

    // Concurrently resolve the issuers' documents.
    let issuers = [];
    for (let jwtCredential of jwtCredentials) {
        let issuer = JwtCredentialValidator.extractIssuerFromJwt(jwtCredential);
        issuers.push(issuer.toString());
    }
    let resolvedIssuers = await resolver.resolveMultiple(issuers);

    // Validate the credentials in the presentation.
    for (let i = 0; i < jwtCredentials.length; i++) {
        credentialValidator.validate(
            jwtCredentials[i],
            resolvedIssuers[i],
            validationOptions,
            FailFast.FirstError,
        );
    }

    // Since no errors were thrown we know that the validation was successful.
    console.log(`VP successfully validated`);
}

// // ================ SAMPLE USAGE ===================
const nonce = "475a7984-1bb5-4c4c-a56f-822bccd46440";
const proofJwkString = "eyJraWQiOiJkaWQ6aW90YTp0c3Q6MHhiMGZjOTI2NDMxYjM2YzczYmJiNGQ4OGM0MTU3MWY4NGUwZDIzYWQ4MDFmYjcxYzA3MjYzZGEyYTVkNWJmZDZiI2tleS0xIiwidHlwIjoiSldUIiwibm9uY2UiOiI0NzVhNzk4NC0xYmI1LTRjNGMtYTU2Zi04MjJiY2NkNDY0NDAiLCJhbGciOiJFZERTQSJ9.eyJleHAiOjE3MTgwOTk0MzIsImlzcyI6ImRpZDppb3RhOnRzdDoweGIwZmM5MjY0MzFiMzZjNzNiYmI0ZDg4YzQxNTcxZjg0ZTBkMjNhZDgwMWZiNzFjMDcyNjNkYTJhNWQ1YmZkNmIiLCJ2cCI6eyJAY29udGV4dCI6Imh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwidHlwZSI6IlZlcmlmaWFibGVQcmVzZW50YXRpb24iLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUpyYVdRaU9pSmthV1E2YVc5MFlUcDBjM1E2TUhneE5qRmxZV1prTURjNU4yRmtOemhpT0RnNU1UUTNOMk00T1RNeVpHRXpaakF3TWpKaFptTTVOVFpqTnpkaFkyTmpOamxrTkdRNE9USmlaREZtTVRjMkkydGxlUzB4SWl3aWRIbHdJam9pU2xkVUlpd2lZV3huSWpvaVJXUkVVMEVpZlEuZXlKcGMzTWlPaUprYVdRNmFXOTBZVHAwYzNRNk1IZ3hOakZsWVdaa01EYzVOMkZrTnpoaU9EZzVNVFEzTjJNNE9UTXlaR0V6WmpBd01qSmhabU01TlRaak56ZGhZMk5qTmpsa05HUTRPVEppWkRGbU1UYzJJaXdpYm1KbUlqb3hOekU0TURrNE56ZzRMQ0pxZEdraU9pSm9kSFJ3Y3pvdkwyVjRZVzF3YkdVdVpXUjFMMk55WldSbGJuUnBZV3h6THpNM016SWlMQ0p6ZFdJaU9pSmthV1E2YVc5MFlUcDBjM1E2TUhoaU1HWmpPVEkyTkRNeFlqTTJZemN6WW1KaU5HUTRPR00wTVRVM01XWTROR1V3WkRJellXUTRNREZtWWpjeFl6QTNNall6WkdFeVlUVmtOV0ptWkRaaUlpd2lkbU1pT25zaVFHTnZiblJsZUhRaU9pSm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0lzSW5SNWNHVWlPbHNpVm1WeWFXWnBZV0pzWlVOeVpXUmxiblJwWVd3aUxDSlZibWwyWlhKemFYUjVSR1ZuY21WbFEzSmxaR1Z1ZEdsaGJDSmRMQ0pqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKSFVFRWlPaUkwTGpBaUxDSmtaV2R5WldWT1lXMWxJam9pUW1GamFHVnNiM0lnYjJZZ1UyTnBaVzVqWlNCaGJtUWdRWEowY3lJc0ltUmxaM0psWlZSNWNHVWlPaUpDWVdOb1pXeHZja1JsWjNKbFpTSXNJbTVoYldVaU9pSkJiR2xqWlNKOWZYMC5GVGdtVVQxSGpWOWtQUnhiOEQ4aGl5dlUzOUhFeWhud3ByeHczTE1HTndRUVZ5TjRiRmNBclBTWlBVSUo5emg0ZzZobUNXamRMQk5UTG1DdDNxVDBDZyJdLCJtZXRhZGF0YSI6eyJwdXJwb3NlIjoiSVZFIGNvbmNlcnQ6IFNob3cgV2hhdCBJIEhhdmUiLCJwcmljZSI6IjY2MDAifX19.1jT3Sko3NChzn8ks8__PW9ymV-VreidSPWdTbJnallkk6aY9UDdw6Al0hSGyXRKq9aTggv3djg47YvvS4JkCBQ";

validateVP(nonce, proofJwkString).then(() => process.exit()).catch(console.error);
// // ================ SAMPLE USAGE ===================