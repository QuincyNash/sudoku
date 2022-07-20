import {
	signInWithRedirect,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	GithubAuthProvider,
	getRedirectResult,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);

	return (
		<>
			<Head>
				<meta></meta>
				<title>WebSudoku | Login</title>
			</Head>
			<div className="w-screen h-screen flex-center bg-[#f8f9fd]">
				<div className="w-[calc(100%-2rem)] max-w-[600px] h-fit p-[clamp(24px,25vw-135px,48px)] pt-12 bg-white rounded-lg shadow-md">
					<h3 className="text-4xl text-center mb-4 font-courgette">Login</h3>
					<form
						method="post"
						className="w-full h-full flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
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
							autoComplete="current-password"
							placeholder="Password"
							required
						/>
						<button type="submit" className="form-submit">
							Login
						</button>
						<div className="flex w-full">
							<button type="button" className="google-signin" formNoValidate>
								<Image
									alt=""
									width="20px"
									height="20px"
									src="/google.svg"
								></Image>
								<span className="hidden login-wrap:block">
									Login with Google
								</span>
								<span className="block login-wrap:hidden">Google</span>
							</button>
							<button type="button" className="facebook-signin" formNoValidate>
								<Image
									alt=""
									width="20px"
									height="20px"
									src="/facebook.svg"
								></Image>
								<span className="hidden login-wrap:block">
									Login with Facebook
								</span>
								<span className="block login-wrap:hidden">Facebook</span>
							</button>
						</div>
					</form>
					<p className="text-center mt-4">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="underline text-blue-600 hover:text-purple-700 focus:text-purple-700"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
