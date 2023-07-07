import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  const id = req.query.id // Check query parameter and request body
  const record = await xata.db.ConfigProfiles.select(["*", "location.*", "left_neighbour.map_position_id","left_neighbour.ip", "right_neighbour.map_position_id","right_neighbour.ip", "screen_type.type"  ]).filter({ id: id }).getMany(); 
  try {
    const data = record[0];
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message, data});
  }
}

export default handler;
