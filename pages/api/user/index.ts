import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../utils/userModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if(req.method == "GET"){
    const users = await User.findAll()
    res.status(200).json({ data: users });
  }

  if(req.method == "POST"){
    const user = await User.create(req.body)
    res.status(200).json({ data: user });
  }
  res.status(404)
}
