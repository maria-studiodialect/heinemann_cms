import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  try {
    const locationId = req.query.locationId // Check query parameter and request body
    const data = await xata.db.ConfigProfiles.select(["id", "map_position_id" ]).filter({ "location.id": locationId }).filter({ writeable: 'true' }).getMany(); //get only map_ids
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
}

export default handler;
