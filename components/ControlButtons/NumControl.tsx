interface NumControlProps {
	num?: number;
	isDelete?: boolean;
	onClick: () => void;
}

function NumControl(props: NumControlProps) {
	return (
		<button
			className={`w-full h-full ${
				props.isDelete ? "col-span-2" : "col-span-1"
			} flex justify-center items-center rounded-md bg-primary-500 dark:bg-primary-700 bg-opacity-100 border border-primary-400 dark:border-primary-600 outline-none transition-colors hover:bg-opacity-90 dark:hover:bg-opacity-80`}
			onClick={props.onClick}
		>
			<span className="w-full h-full flex justify-center items-center text-white text-[5vh] font-primary select-none transition-colors md:text-[min(4vw,10vh)] dark:text-slate-300">
				<IconOrText {...props}></IconOrText>
			</span>
		</button>
	);
}

function IconOrText(props: NumControlProps) {
	if (props.isDelete) {
		return (
			<div className="w-1/3 aspect-square">
				<svg viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path
						fill="currentColor"
						d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
					></path>
				</svg>
			</div>
		);
	} else {
		return <span>{props.num}</span>;
	}
}

export default NumControl;
