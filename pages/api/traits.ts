const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = await postTrait(req.body, req.headers.authorization)
        return res.json(data)
    }
}

const postTrait = async (info, auth) => {
    const body = info
    const url = process.env.API + "traits/"
    const headers = { "Content-Type": "application/json", Authorization: auth }
    const response = await fetch(url, { method: "POST", body, mode: "cors", headers })
    return await response.json()
}

export default handler