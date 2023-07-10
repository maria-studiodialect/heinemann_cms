import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database
  const id = req.query.id
  const record = await xata.db.Screens.select(["*","config_profile.*","config_profile.location.*", "config_profile.screen_type.*", "config_profile.right_neighbour.*", "config_profile.left_neighbour.*"]).filter({ id: id }).getMany()
  try {
    const data = record[0]
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler
