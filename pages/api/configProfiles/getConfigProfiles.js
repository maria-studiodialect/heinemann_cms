import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database
  try {
    const data = await xata.db.ConfigProfiles.select(["*", 'xata.updatedAt', "location.*", "left_neighbour.map_position_id","left_neighbour.ip", "right_neighbour.map_position_id","right_neighbour.ip", "screen_type.type" ]).getMany()
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler
