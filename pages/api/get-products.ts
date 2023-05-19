import type { NextApiRequest, NextApiResponse } from 'next'
// https://www.notion.so/my-integrations
import { PrismaClient } from '@prisma/client'

type Data = {
  items? : any
  message: string
}

const prisma = new PrismaClient()

const getProducts = async () => {
  try {
    const response = await prisma.products.findMany()
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
    const response = await getProducts()
    res.status(200).json({ items: response, message: "Sucess "})
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Fail "})
  }
}
