const handler = async (req, res) => {
    return await postRefresh(req.body)
}

const postRefresh = async (body) => {
    const url = process.env.API + "refresh/"
    const response = await fetch(url, { method: "POST", body, mode: "cors", headers: { "Content-Type": "application/json" } })
    return await response.json()
}

export default handler