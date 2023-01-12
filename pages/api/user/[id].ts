import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../utils/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method == "GET") {
    const user = await User.findByPk(req.query.id as string);
    res.status(200).json({ data: user });
  }

  if (req.method == "PUT") {
    const user = await User.update(req.body, {
      where: {
        id: req.query.id as string,
      },
    });
    res.status(200).json({ data: user });
  }

  if (req.method == "DELETE") {
    await User.destroy({
      where: {
        id: req.query.id as string,
      },
    });
    res.status(200).json({ msg: "delete succesfull" });
  }

  res.status(404);
}
