import type { NextApiRequest, NextApiResponse } from 'next'
// https://www.notion.so/my-integrations
import { Client } from "@notionhq/client"

type Data = {
  items? : any
  message: string
}
const notion = new Client({
  auth: process.env.NOTION_APIKEY
})
const notionDB = "45acc13e251f444fb2cadab83ed0ae18"

const getItems = async () => {
  try {
    const response = await notion.databases.query({
      database_id: notionDB,
      sorts: [{
        property: 'price',
        direction: "ascending",
      }]
    })
    return response
  } catch (error) {
    console.log(error)
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: "Sucess "})
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Fail "})
  }
}
