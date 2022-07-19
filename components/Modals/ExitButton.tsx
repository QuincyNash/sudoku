interface ExitButtonProps {
	label: string;
	onClick: () => void;
}

function ExitButton(props: ExitButtonProps) {
	return (
		<button
			aria-label={props.label}
			title={props.label}
			className="flex-center w-1/4 max-w-[150px] h-[6vh] mt-2 p-1 rounded-md border border-secondary-200 border-opacity-50 bg-secondary-300 outline-none bg-opacity-0 text-secondary-500 transition-colors hover:bg-opacity-20"
			onClick={props.onClick}
		>
			<div className="h-3/4">
				<svg viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M16.88,2.88L16.88,2.88c-0.49-0.49-1.28-0.49-1.77,0l-8.41,8.41c-0.39,0.39-0.39,1.02,0,1.41l8.41,8.41 c0.49,0.49,1.28,0.49,1.77,0l0,0c0.49-0.49,0.49-1.28,0-1.77L9.54,12l7.35-7.35C17.37,4.16,17.37,3.37,16.88,2.88z"
					></path>
				</svg>
			</div>
			<span className="text-[2.5vh] select-none font-primary font-medium">
				Back
			</span>
		</button>
	);
}

export default ExitButton;
