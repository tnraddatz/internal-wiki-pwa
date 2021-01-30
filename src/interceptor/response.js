
export const createResponse = (respObject, isSuccess) => {
    let response = {}
    if (respObject) {
        response = {
            status: isSuccess ? 200 : respObject.status ? respObject.status : 500,
            statusText: isSuccess ? 'success' : respObject.statusText ? respObject.statusText : 'unknown user interface error',
            data: isSuccess ? respObject : respObject.data ? respObject.data : {},
            isSuccess: isSuccess,
            isError: !isSuccess,
            isLoading: false
        }
    } else { // If the user it not logged in, the call to cognito fails and an unknown network error is thrown
        //This is the only known error for this issue, so we will prompt users with a "try to login" message.
        response = {
            status: 500,
            statusText: 'Please Login and Try Again',
            data: {},
            isSuccess: false,
            isError: true,
            isLoading: false
        }
    }

    return response
}

export const loadingResponse = () => {
    const response = {
        status: null,
        statusText: null,
        data: null,
        isSuccess: false,
        isError: false,
        isLoading: true
    }
    return response
}