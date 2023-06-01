import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  try {
    const id = req.query.id || req.body.id; // Check query parameter and request body
    const data = await xata.db.ConfigProfiles.select(["*"]).filter({ id: id }).getMany(); //get only map_ids
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
}

export default handler;
