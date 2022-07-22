import {
	FacebookAuthProvider,
	getAuth,
	getRedirectResult,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithRedirect,
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
	const [hideError, setHideError] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			setLoading(
				localStorage.getItem("WebSudoku_FIREBASE_REDIRECTING") === "true"
					? true
					: false
			);

			startApp();

			const result = await getRedirectResult(getAuth());
			if (result) {
				console.log(result?.user);

				localStorage.removeItem("WebSudoku_FIREBASE_REDIRECTING");
				router.push("/play/1");
			}
		})();
	});

	return (
		<>
			<Head>
				<title>WebSudoku | Sign Up</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Create an account with WebSudoku"
				></meta>
			</Head>

			<Loader visible={loading}></Loader>

			<div className="w-screen h-screen overflow-auto flex justify-center bg-[#f8f9fd]">
				<div className="w-[calc(100%-2rem)] max-w-[600px] h-fit p-[clamp(24px,25vw-135px,48px)] my-auto pt-12 bg-white rounded-lg shadow-md">
					<h1
						className="mb-4 text-4xl text-center font-courgette"
						style={{
							userSelect: loading ? "none" : "text",
						}}
					>
						Create an Account
					</h1>

					<Form
						error={error}
						disabled={loading}
						submitText="Sign Up"
						footerText="Already have an account?"
						footerLink="/login"
						footerLinkText="Login"
						fields={[
							{
								id: "username",
								type: "text",
								autoComplete: "username",
								placeholder: "Username",
								minLength: 3,
								maxLength: 20,
								allowed:
									"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-",
								rules: [],
							},
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
							{
								id: "confirm-password",
								type: "password",
								autoComplete: "new-password",
								placeholder: "Confirm Password",
								name: "Password Confirmation",
								minLength: 1,
								maxLength: 48,
								rules: [],
								match: "#password",
							},
						]}
						onSubmit={(e) => {
							e.preventDefault();

							localStorage.setItem("WebSudoku_FIREBASE_REDIRECTING", "true");
							setLoading(true);

							const form = e.target as HTMLFormElement;
							const usernameElem = document.querySelector(
								"#username"
							) as HTMLInputElement;
							const emailElem = document.querySelector(
								"#email"
							) as HTMLInputElement;
							const passwordElem = document.querySelector(
								"#password"
							) as HTMLInputElement;

							const formData = {
								username: usernameElem.value,
								email: emailElem.value,
								password: passwordElem.value,
							};

							fetch("/api/signup", {
								method: "POST",
								body: JSON.stringify(formData),
							}).then(async (res) => {
								let message = (await res.json()).message;

								if (message === "Success") {
									startApp();

									signInWithEmailAndPassword(
										getAuth(),
										emailElem.value,
										passwordElem.value
									).then(() => {
										router.push("/play/1");
									});
								} else {
									localStorage.removeItem("WebSudoku_FIREBASE_REDIRECTING");
									setLoading(false);
									setHideError(false);

									if (message === "Bad Request") {
										setError("Your username, email, or password was invalid");
									} else if (message === "Server Error") {
										setError("Something went wrong. Please try again later.");
									} else if (message === "Email Taken") {
										setError(
											"This email address already has an account associated with it"
										);
									}
								}
							});
						}}
					>
						<LoginButtons
							loading={loading}
							isLogin={false}
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
