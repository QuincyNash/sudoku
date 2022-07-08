import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	if (req.query.token !== process.env.TOKEN) {
		return res.status(401).json({ message: "Invalid Token" });
	}

	try {
		const id = req.query.id;

		if (id) {
			await res.revalidate(`/play/${id}`);
		} else {
			return res.json({ message: "Invalid Id" });
		}

		return res.json({ message: "Success" });
	} catch (err) {
		return res.status(500).json({ message: "Server Error" });
	}
}
