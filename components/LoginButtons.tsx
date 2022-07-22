import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";
import Image from "next/image";

interface LoginButtonsProps {
	isLogin: boolean;
	loading: boolean;
	onGoogleClick: () => void;
	onFacebookClick: () => void;
}

export default function LoginButtons(props: LoginButtonsProps) {
	return (
		<div className="flex w-full">
			<button
				type="button"
				disabled={props.loading}
				className="flex-center gap-3 w-1/2 h-12 p-3 border border-[rgba(0,0,0,0.1)] transition-shadow rounded-md outline-blue-600 mr-1 text-sm font-semibold text-[#757575] font-primary hover-focus:shadow-lg"
				onClick={props.onGoogleClick}
			>
				<Image
					alt=""
					width="20px"
					height="20px"
					className="inline-block mr-3"
					src="/google.svg"
				></Image>
				<span
					className={`hidden ${
						props.isLogin ? "login-wrap:inline" : "signup-wrap:inline"
					}`}
				>
					{props.isLogin ? "Login" : "Sign Up"} with Google
				</span>
				<span
					className={`inline ${
						props.isLogin ? "login-wrap:hidden" : "signup-wrap:hidden"
					}`}
				>
					Google
				</span>
			</button>
			<button
				type="button"
				disabled={props.loading}
				className="h-12 p-3 border border-[rgba(0,0,0,0.1)] transition-shadow rounded-md flex-center gap-3 w-1/2 ml-1 text-sm font-semibold text-white bg-[#3b5998] shadow-lg shadow-transparent font-primary hover-focus:shadow-[#a6a6e5] outline-blue-600"
				onClick={props.onFacebookClick}
			>
				<Image
					alt=""
					width="20px"
					height="20px"
					className="inline-block mr-3"
					src="/facebook.svg"
				></Image>
				<span
					className={`hidden ${
						props.isLogin ? "login-wrap:inline" : "signup-wrap:inline"
					}`}
				>
					{props.isLogin ? "Login" : "Sign Up"} with Facebook
				</span>
				<span
					className={`inline ${
						props.isLogin ? "login-wrap:hidden" : "signup-wrap:hidden"
					}`}
				>
					Facebook
				</span>
			</button>
		</div>
	);
}
