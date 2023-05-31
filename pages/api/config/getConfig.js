import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database
  try {
    const data = await xata.db.Config.select(["*", "location.*", "left_neighbour.map_id","left_neighbour.ip", "right_neighbour.map_id","right_neighbour.ip" ]).getMany()
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler
