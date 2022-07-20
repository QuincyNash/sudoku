import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import startApp from "../lib/client";

export default function SignUp() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<Head>
				<meta></meta>
				<title>WebSudoku | Sign Up</title>
			</Head>
			<div className="w-screen h-screen flex-center bg-[#f8f9fd]">
				<div className="w-[calc(100%-2rem)] max-w-[600px] h-fit p-[clamp(24px,25vw-135px,48px)] pt-12 bg-white rounded-lg shadow-md">
					<h3 className="text-4xl text-center mb-4 font-courgette">
						Create an Account
					</h3>
					<form
						action="api/signup"
						method="post"
						className="w-full h-full flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();

							const form = e.target as HTMLFormElement;
							const usernameElem = form.children[0] as HTMLInputElement;
							const emailElem = form.children[1] as HTMLInputElement;
							const passwordElem = form.children[2] as HTMLInputElement;

							const formData = {
								username: usernameElem.value,
								email: emailElem.value,
								password: passwordElem.value,
							};

							setLoading(true);

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
									if (message !== "Email Taken") usernameElem.value = "";
									emailElem.value = "";
									if (message !== "Email Taken") passwordElem.value = "";

									setLoading(false);
									setError(message);
								}
							});
						}}
					>
						<input
							name="username"
							className="form-element"
							type="text"
							autoComplete="username"
							placeholder="Username"
							required
						/>
						<input
							name="email"
							className="form-element"
							type="email"
							autoComplete="email"
							placeholder="Email"
							required
						/>
						<input
							name="password"
							className="form-element"
							type="password"
							autoComplete="new-password"
							placeholder="Password"
							required
						/>

						<button type="submit" className="form-submit">
							Sign Up
						</button>
						<div className="flex w-full">
							<button type="button" formNoValidate className="google-signin">
								<Image
									alt=""
									width="20px"
									height="20px"
									className="inline-block mr-3"
									src="/google.svg"
								></Image>
								<span className="hidden signup-wrap:inline">
									Sign Up with Google
								</span>
								<span className="inline signup-wrap:hidden">Google</span>
							</button>
							<button type="button" formNoValidate className="facebook-signin">
								<Image
									alt=""
									width="20px"
									height="20px"
									className="inline-block mr-3"
									src="/facebook.svg"
								></Image>
								<span className="hidden signup-wrap:inline">
									Sign Up with Facebook
								</span>
								<span className="inline signup-wrap:hidden">Facebook</span>
							</button>
						</div>
					</form>
					<p className="text-center mt-4">
						Already have an account?{" "}
						<Link
							className="underline text-blue-600 hover:text-purple-700 focus:text-purple-700"
							href="/login"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
