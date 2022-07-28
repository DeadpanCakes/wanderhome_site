const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = await postTrait(req.body, req.headers.authorization)
        return res.json(data)
    }
    if (req.method === "DELETE") {
        const { id } = JSON.parse(req.body)
        const data = await deleteTrait(id, req.headers.authorization)
        if (data.status === 204) {
            return res.json({ "message": "deleted" })
        }
        return res.json(await data.json())
    }
}

const postTrait = async (info, auth) => {
    const body = info
    const url = process.env.API + "traits/"
    const headers = { "Content-Type": "application/json", Authorization: auth }
    const response = await fetch(url, { method: "POST", body, mode: "cors", headers })
    return await response.json()
}

const deleteTrait = async (targetID, auth) => {
    const url = process.env.API + `traits/${targetID}/`
    console.log(url)
    const headers = { "Content-Type": "application/json", Authorization: auth }
    return await fetch(url, { method: "DELETE", mode: "cors", headers })
}

export default handler