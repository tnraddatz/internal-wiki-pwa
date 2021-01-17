
import { Auth, API } from 'aws-amplify'
import { createResponse } from './response'


export const callNewsAPI = async (type, body, apiPath) => {
    const apiName = 'DevNewsApi'

    const apiRequest = {
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    switch (type.toLowerCase()) {
        case "get":
            return await API.get(apiName, apiPath, apiRequest)
                .then(response => {
                    const responseObject = createResponse(response, true)
                    return responseObject
                })
                .catch(error => {
                    const responseObject = createResponse(error.response, false)
                    return responseObject
                });
        case "post":
            return await API.post(apiName, apiPath, apiRequest)
                .then(response => {
                    const responseObject = createResponse(response, true)
                    return responseObject
                })
                .catch(error => {
                    const responseObject = createResponse(error.response, false)
                    return responseObject
                });
        case "del":
            return await API.del(apiName, apiPath, apiRequest)
                .then(response => {
                    const responseObject = createResponse(response, true)
                    return responseObject
                })
                .catch(error => {
                    const responseObject = createResponse(error.response, false)
                    return responseObject
                });
        default:
            const responseObject = createResponse({
                status: 500,
                statusText: "Invalid Call to Service",
                data: {},
                isSuccess: false
            }, false)
            return responseObject
    }
};
