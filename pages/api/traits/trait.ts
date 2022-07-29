import APIHandler from "../../../middleware/APIHandler"

const handler = async (req, res) => {
    const baseURL = process.env.API + "traits/"
    const { authorization } = req.headers
    const apiMethods = APIHandler(baseURL, req.body, authorization)
    if (req.method === "POST") {
        const data = apiMethods.post()
        return res.json(data)
    }
    if (req.method === "DELETE") {
        const data = apiMethods.delete()
        return res.json(data)
    }
}

export default handler