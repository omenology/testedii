// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sequelize from "../../utils/dbConnection";
import User from "../../utils/userModel";
type Data = {
  msg: string;
};

sequelize
  .authenticate()
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

User.sync({ force: true });

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ msg: "sync" });
}
