
export const createResponse = (respObject, isSuccess) => {
    const response = {
        status: isSuccess ? 200 : respObject.status ? respObject.status : 500,
        statusText: isSuccess ? 'success' : respObject.statusText ? respObject.statusText : 'unknown user interface error',
        data: isSuccess ? respObject : respObject.data ? respObject.data : {},
        isSuccess: isSuccess,
        isError: !isSuccess,
        isLoading: false
    }
    console.log(response)
    return response
}

export const loadingResponse = () => {
    const response = {
        status: null,
        statusText: null,
        data: null,
        isSuccess: null,
        isError: null,
        isLoading: true
    }
    return response
}