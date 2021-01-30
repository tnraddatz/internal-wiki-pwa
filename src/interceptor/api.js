
import { Auth, API } from 'aws-amplify'
import { createResponse } from './response'


export const callNewsAPI = async (body, apiPath) => {
    const apiName = 'DevNewsApi'

    const apiRequest = {
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //POST is the only type of request we make to api-gateway b/c of SigV4
    return await API.post(apiName, apiPath, apiRequest)
        .then(response => {
            const responseObject = createResponse(response, true)
            return responseObject
        })
        .catch(error => {
            const responseObject = createResponse(error.response, false)
            return responseObject
        });
};

