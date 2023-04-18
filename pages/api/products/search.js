import { NextApiHandler } from "next";
import { getXataClient } from "../../../utils/xata";

const xata = getXataClient()

const handler = async (req, res) => {
  const data = await xata.db.Products.search(req.body.value, {
    fuzziness: 1,
    prefix: "phrase",
    source: ["*", "brand.*"] 
  });
  res.status(200).json({
    data,
  });
};
export default handler;