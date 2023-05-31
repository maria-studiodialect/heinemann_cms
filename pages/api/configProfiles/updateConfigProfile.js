import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // using update method to update records in database
  const { id, ...data } = req.body
  const record = await xata.db.ConfigProfiles.filter({map_id: id}).getMany();
  console.log(record)
  try {
    await record[0].update({ ...data })
    res.json({ message: 'Success 😁' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

export default handler
