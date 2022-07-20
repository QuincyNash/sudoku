import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { validate } from "email-validator";
import initApp from "../../lib/firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

interface SignupForm {
	username: string;
	email: string;
	password: string;
}

export interface User {
	username: string;
	pro: boolean;
	darkmode: boolean;
}

const usernameValidator = /^[a-zA-Z0-9_-]{3,20}$/;
const passwordValidator =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) {
	return new Promise(async (resolve, reject) => {
		let username: string, email: string, password: string;

		try {
			let body = JSON.parse(req.body) as SignupForm;

			username = body.username;
			email = body.email;
			password = body.password;
		} catch {
			return res.status(400).json({ message: "Bad Request" });
		}

		if (
			typeof username !== "string" ||
			typeof email !== "string" ||
			typeof password !== "string"
		) {
			return res.status(400).json({ message: "Bad Request" });
		}

		if (
			!usernameValidator.test(username) ||
			!validate(email) ||
			!passwordValidator.test(password)
		) {
			return res.status(400).json({ message: "Bad Request" });
		}

		initApp();
		const auth = admin.auth();

		try {
			const existingUser = auth
				.getUserByEmail(email)
				// User Account Already Exists
				.then(() => {
					return res.status(400).json({ message: "Email Taken" });
				})
				// Create User
				.catch(async () => {
					try {
						const user = await auth.createUser({
							displayName: username,
							email,
							password,
						});

						const db = admin.firestore();
						await db.doc(`/users/${user.uid}`).create({
							username,
							pro: false,
							darkmode: true,
						} as User);

						return res.status(200).json({ message: "Success" });
					} catch (err) {
						return res.status(500).json({ message: "Server Error" });
					}
				});
		} catch (err) {
			return res.status(500).json({ message: "Server Error" });
		}
	});
}
