const APIHandler = (baseURL, body, auth) => {
    const postToEndpoint = async (url, data) => {
        const { body, auth } = data
        const headers = { "Content-Type": "application/json", Authorization: auth }
        const response = await fetch(url, { method: "POST", body, mode: "cors", headers })
        return await response.json()
    }

    const deleteToEndpoint = async (url, data) => {
        const headers = { "Content-Type": "application/json", Authorization: data.auth }
        return await fetch(url, { method: "DELETE", mode: "cors", headers })
    }
    return {
        post: async () => {
            const data = await postToEndpoint(baseURL, { body, auth })
            return data
        },
        delete: async () => {
            const { id } = JSON.parse(body)
            const url = baseURL + id
            const data = await deleteToEndpoint(url, { auth })
            if (data.status === 204) {
                return { "message": "deleted" }
            }
            return await data.json()
        }
    }
}

export default APIHandler