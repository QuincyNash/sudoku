import {
	signInWithRedirect,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	GithubAuthProvider,
	getRedirectResult,
	FacebookAuthProvider,
	signOut,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Loader from "../components/Loader";
import LoginButtons from "../components/LoginButtons";
import startApp from "../lib/client";

export default function SignUp() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			setLoading(
				localStorage.getItem("WebSudoku_FIREBASE_REDIRECTING") === "true"
					? true
					: false
			);

			startApp();
			const auth = getAuth();

			const result = await getRedirectResult(auth);
			if (result?.user) {
				const res = await fetch("api/provider-signup", {
					method: "POST",
					body: await result.user.getIdToken(),
				});
				const message = (await res.json()).message;

				localStorage.removeItem("WebSudoku_FIREBASE_REDIRECTING");

				if (message === "Success") {
					router.push("/play/1");
				} else {
					setLoading(false);
					setError("Something went wrong. Please try again later.");
				}
			}
		})();
	});

	return (
		<>
			<Head>
				<title>WebSudoku | Login</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Login to your account with WebSudoku"
				></meta>
			</Head>

			<Loader visible={loading}></Loader>

			<div className="w-screen h-screen overflow-auto flex justify-center bg-[#f8f9fd]">
				<div className="w-[calc(100%-2rem)] max-w-[600px] h-fit p-[clamp(24px,25vw-135px,48px)] my-auto pt-12 bg-white rounded-lg shadow-md">
					<h3 className="font-courgette mb-4 text-4xl text-center">Login</h3>
					<Form
						error={error}
						disabled={loading}
						submitText="Login"
						footerText="Don't have an account?"
						footerLink="/signup"
						footerLinkText="Sign Up"
						fields={[
							{
								id: "email",
								type: "email",
								autoComplete: "email",
								placeholder: "Email",
								minLength: 1,
								rules: [],
							},
							{
								id: "password",
								type: "password",
								autoComplete: "new-password",
								placeholder: "Password",
								minLength: 8,
								maxLength: 48,
								rules: [
									{
										required: "letter",
										count: 1,
									},
									{
										required: "number",
										count: 1,
									},
									{
										required: "special",
										count: 1,
									},
								],
							},
						]}
						onSubmit={(e) => {
							e.preventDefault();

							setError(null);
							setLoading(true);

							const auth = getAuth();

							const emailElem = document.querySelector(
								"#email"
							) as HTMLInputElement;
							const passwordElem = document.querySelector(
								"#password"
							) as HTMLInputElement;

							signInWithEmailAndPassword(
								auth,
								emailElem.value,
								passwordElem.value
							)
								.then((result) => {
									if (result.user) {
										router.push("/play/1");
									} else {
										setLoading(false);
										setError("Something went wrong. Please try again later");
									}
								})
								.catch(() => {
									setLoading(false);
									setError("Your email and password do not match");
								});
						}}
					>
						<LoginButtons
							loading={loading}
							isLogin={true}
							onGoogleClick={() => {
								localStorage.setItem("WebSudoku_FIREBASE_REDIRECTING", "true");
								signInWithRedirect(getAuth(), new GoogleAuthProvider());
							}}
							onFacebookClick={() => {
								localStorage.setItem("WebSudoku_FIREBASE_REDIRECTING", "true");
								signInWithRedirect(getAuth(), new FacebookAuthProvider());
							}}
						></LoginButtons>
					</Form>
				</div>
			</div>
		</>
	);
}
