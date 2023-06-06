import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // getMany method is used to create records in database
  const id = req.query.id // Check query parameter and request body
  const record = await xata.db.Screens.select(["*", "slide_1.*", "slide_2.*", "slide_3.*", "slide_4.*"]).filter({ 'test.id': id }).getMany(); 
  try {
    const data = record[0];
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] })
  }
}

export default handler 
