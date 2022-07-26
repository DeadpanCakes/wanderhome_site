const handler = async (req, res) => {
    if (req.method === "POST") {
        const authTokens = await postLogin(req.body)
        return res.json(authTokens)
    }
}

const postLogin = async (info) => {
    const body = info
    const url = process.env.API + "login/"
    const response = await fetch(url, { method: "POST", body, mode: "cors", headers: { "Content-Type": "application/json" } })
    return await response.json()
}

export default handler