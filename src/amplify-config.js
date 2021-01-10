// This file is used for manual configuration of the Amplify library.
// When Amplify is used in conjunction with the Amplify CLI toolchain or AWS Mobile Hub to manage backend resources,
// an aws-exports.js file is auto-generated and can be used instead of the below to automatically configure the Amplify library.
// In this workshop, we are using the Amplify client libraries without the CLI toolchain so you should edit this file manually.

const awsConfig = {
    Auth: {
        identityPoolId: 'us-east-1:66815071-37ae-4c1b-93ae-b7b35802de18', // devo
        region: 'us-east-1',
        userPoolId: 'us-east-1_WqFlZ7Ewe',
        userPoolWebClientId: '41cdu696ojkjp18agbs1f8ef49' // App Client Id
    },
    API: {
        endpoints: [
            {
                name: 'WildRydesAPI',
                endpoint: '', // example: 'https://u8swuvl00f.execute-api.us-east-2.amazonaws.com/prod'
                region: '' // example: 'us-east-2'
            }
        ]
    },
    Storage: {
        bucket: '', //example: 'wildrydesbackend-profilepicturesbucket-1wgssc97ekdph'
        region: '' // example: 'us-east-2'
    }
}

export default awsConfig;