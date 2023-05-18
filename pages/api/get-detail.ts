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

const getDetail = async (pageId: string, propertyId: string) => {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId
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
    const {pageId, propertyId} = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ items: response, message: "Sucess "})
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Fail "})
  }
}
