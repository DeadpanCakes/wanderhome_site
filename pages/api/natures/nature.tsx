import APIHandler from "../../../middleware/APIHandler";

const handler = async (req, res) => {
  const baseURL = process.env.API + "natures/";
  const { authorization } = req.headers;
  const apiMethods = APIHandler(baseURL, req.body, authorization);
  if (req.method === "POST") {
    const data = await apiMethods.post();
    return res.json(data);
  }
  if (req.method === "DELETE") {
    const data = await apiMethods.delete();
    return res.json(data);
  }
};

export default handler;
