import {
	signInWithRedirect,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	GithubAuthProvider,
	getRedirectResult,
	FacebookAuthProvider,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import LoginButtons from "../components/LoginButtons";

export default function SignUp() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<Head>
				<meta></meta>
				<title>WebSudoku | Login</title>
			</Head>
			<div className="w-screen h-screen overflow-auto flex justify-center bg-[#f8f9fd]">
				<div className="w-[calc(100%-2rem)] max-w-[600px] h-fit p-[clamp(24px,25vw-135px,48px)] my-auto pt-12 bg-white rounded-lg shadow-md">
					<h3 className="mb-4 text-4xl text-center font-courgette">Login</h3>
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
