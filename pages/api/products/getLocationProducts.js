import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database

  try {
    const data = await xata.db.Products.select(["*", "brand.*"]).getMany()
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler
