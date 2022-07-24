import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import defaultUser from "../../lib/default-user";
import initApp from "../../lib/firebase";

interface SignupForm {
	username: string;
	email: string;
	password: string;
}

const usernameValidator = /^[a-zA-Z0-9_-]{3,20}$/;
const passwordValidator =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,48}$/;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	initApp();

	const idToken = req.body as string;
	const auth = admin.auth();

	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		const user = await auth.getUser(decodedToken.uid);

		const db = admin.firestore();
		const doc = db.doc(`/users/${user.uid}`);

		if ((await doc.get()).exists) {
			return res.status(200).json({ message: "Success" });
		}

		await doc.create(defaultUser(user));
		console.log(`Sign Up Provider with ID: ${user.uid}`);

		res.status(200).json({ message: "Success" });
	} catch {
		res.status(500).json({ message: "Server Error" });
	}
}
