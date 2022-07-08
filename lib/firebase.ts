import admin from "firebase-admin";

export default function initApp() {
	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert({
				type: "service_account",
				project_id: process.env.FIREBASE_PROJECT_ID,
				private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
				private_key: (process.env.FIREBASE_PRIVATE_KEY as any).replace(
					/\\n/g,
					"\n"
				),
				client_email: process.env.FIREBASE_CLIENT_EMAIL,
				client_id: process.env.FIREBASE_CLIENT_ID,
				auth_uri: "https://accounts.google.com/o/oauth2/auth",
				token_uri: "https://oauth2.googleapis.com/token",
				auth_provider_x509_cert_url:
					"https://www.googleapis.com/oauth2/v1/certs",
				client_x509_cert_url:
					"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cipfz%40sudoku-dec29.iam.gserviceaccount.com",
			} as any),
			databaseURL: process.env.FIREBASE_DATABASE_URL,
		});
	}
}
