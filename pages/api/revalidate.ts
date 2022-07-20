import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	try {
		const id = req.query.id;

		if (id) {
			if (req.query.token !== process.env.TOKEN) {
				return res.status(400).json({ message: "Bad Request" });
			}

			await res.revalidate(`/play/${id}`);
		} else {
			return res.status(400).json({ message: "Bad Request" });
		}

		return res.json({ message: "Success" });
	} catch (err) {
		return res.status(500).json({ message: "Server Error" });
	}
}
