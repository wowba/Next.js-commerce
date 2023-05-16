import type { NextApiRequest, NextApiResponse } from 'next'
// https://www.notion.so/my-integrations
import { Client } from "@notionhq/client"

type Data = {
  message: string
}
const notion = new Client({
  auth: process.env.NOTION_APIKEY
})
const notionDB = "45acc13e251f444fb2cadab83ed0ae18"

const addItem = async (name: string) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: notionDB },
      properties: {
        title: [
          {
            text: {
              content: name
            }
          }
        ]
      }
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query
  if (name === null) {
    return res.status(400).json({message: "no query"})
  }

  try {
    await addItem(String(name))
    res.status(200).json({ message: "Sucess " + name })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Fail " + name })
  }
}
