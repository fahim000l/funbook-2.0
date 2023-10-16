import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // Attempt to delete the cookie
    res.setHeader(
      "Set-Cookie",
      serialize("fun_book_token", "", { maxAge: 0, path: "/", httpOnly: true })
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    // Handle any potential errors here
    res.status(500).end("Error deleting the cookie");
  }
}
