import { Puzzle } from "./../play/[id]";
import { deepEqual } from "fast-equals";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

interface ApiBody {
	cells: number[];
	id: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	try {
		const { id, cells }: ApiBody = JSON.parse(req.body);

		const db = admin.firestore();

		const doc = db.doc(`puzzles/${id}`);
		const data = (await doc.get()).data() as Puzzle | undefined;

		if (!data) return res.status(400).json({ message: "Bad Request" });

		if (deepEqual(data.solution, cells)) {
			return res.status(200).json({ message: "Success" });
		} else {
			return res.status(200).json({ message: "Failed" });
		}
	} catch {
		return res.status(400).json({ message: "Bad Request" });
	}
}
