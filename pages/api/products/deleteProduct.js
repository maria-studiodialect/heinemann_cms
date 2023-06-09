import { getXataClient } from '../../../utils/xata'

const xata = getXataClient()

const handler = async (req, res) => {
  // use delete method for deleting the records in database
  const { id } = req.body

  console.log(id)
  try {
    await xata.db.Products.delete(id)
    res.json({ message: 'Success 😁' })
  } catch (error) {
    console.log(error); // Log the error message
    res.status(500).json({ message: error.message })
  }
}

export default handler
