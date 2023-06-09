import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database
  try {
    const data = await xata.db.Screens.select(["*", "slide_1.*", "slide_2.*", "slide_3.*", "slide_4.*"]).getMany()
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler
