import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import defaultUser from "../../lib/default-user";

interface SignupForm {
	username: string;
	email: string;
	password: string;
}

export interface UserInfo {
	pro: boolean;
	darkmode: boolean;
}

const usernameValidator = /^[a-zA-Z0-9_-]{3,20}$/;
const passwordValidator =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,48}$/;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	const idToken = req.body as string;
	const auth = admin.auth();

	try {
		const user = await auth.verifyIdToken(idToken);

		const db = admin.firestore();
		const doc = db.doc(`/users/${user.uid}`);

		if ((await doc.get()).exists) {
			return res.status(200).json({ message: "Success" });
		}

		await doc.create(defaultUser);

		return res.status(200).json({ message: "Success" });
	} catch {
		return res.status(500).json({ message: "Server Error" });
	}
}
