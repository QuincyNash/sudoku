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
				<div className="inline-block w-5 h-5">
					<svg viewBox="0 0 118 120">
						<path
							fill="#4285F4"
							d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z"
						></path>
						<path
							fill="#34A853"
							d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z"
						></path>
						<path
							fill="#FBBC05"
							d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z"
						></path>
						<path
							fill="#EA4335"
							d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z"
						></path>
						<path fill="none" d="M0,0 L120,0 L120,120 L0,120 L0,0 Z"></path>
					</svg>
				</div>
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
				<div className="inline-block w-5 h-5">
					<svg viewBox="0 0 120 120">
						<path fill="none" d="M0,0 L120,0 L120,120 L0,120 L0,0 Z"></path>
						<path
							fill="#ffffff"
							d="M113.377146,0 L6.62285402,0 C2.96477253,0 0,2.96432291 0,6.62285402 L0,113.377146 C0,117.034778 2.96477253,120 6.62285402,120 L64.0955585,120 L64.0955585,73.5298658 L48.45744,73.5298658 L48.45744,55.419305 L64.0955585,55.419305 L64.0955585,42.0634409 C64.0955585,26.5638044 73.5622382,18.1240492 87.388851,18.1240492 C94.011705,18.1240492 99.7043021,18.6172788 101.362938,18.837591 L101.362938,35.0354823 L91.7735131,35.0399784 C84.2536737,35.0399784 82.7978149,38.6130823 82.7978149,43.8565123 L82.7978149,55.419305 L100.731676,55.419305 L98.3963671,73.5298658 L82.7978149,73.5298658 L82.7978149,120 L113.377146,120 C117.034778,120 120,117.034778 120,113.377146 L120,6.62285402 C120,2.96432291 117.034778,0 113.377146,0"
						></path>
					</svg>
				</div>
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
