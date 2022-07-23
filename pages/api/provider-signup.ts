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
	return new Promise(async (resolve, reject) => {
		const idToken = req.body as string;
		const auth = admin.auth();

		auth
			.verifyIdToken(idToken)
			.then(async (user) => {
				const db = admin.firestore();
				const doc = db.doc(`/users/${user.uid}`);

				if ((await doc.get()).exists) {
					res.status(200).send({ message: "Success" });
				}

				doc
					.create(defaultUser)
					.then(() => {
						res.status(200).send({ message: "Success" });
					})
					.catch(() => {
						res.status(500).send({ message: "Server Error" });
					});
			})
			.catch(() => {
				res.status(500).send({ message: "Server Error" });
			});
	});
}
