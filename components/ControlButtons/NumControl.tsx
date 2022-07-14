interface NumControlProps {
	num?: number;
	isDelete?: boolean;
	tool: string;
	onClick: () => void;
}

function NumControl(props: NumControlProps) {
	return (
		<button
			aria-label={
				typeof props.num === "number" ? props.num.toString() : "Delete"
			}
			className={`h-full aspect-square ${
				props.isDelete ? "col-span-2 w-full" : "col-span-1"
			} flex-center rounded-md bg-primary-500 dark:bg-primary-700 bg-opacity-100 border border-primary-400 dark:border-primary-600 outline-none transition-colors hover:bg-opacity-90 dark:hover:bg-opacity-80`}
			onClick={props.onClick}
		>
			<span className="w-full h-full flex-center text-white  font-primary select-none transition-colors  dark:text-slate-300">
				<IconOrText {...props}></IconOrText>
			</span>
		</button>
	);
}

function IconOrText(props: NumControlProps) {
	if (props.isDelete) {
		return (
			<div className="w-[35%] aspect-square">
				<svg viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path
						fill="currentColor"
						d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
					></path>
				</svg>
			</div>
		);
	} else if (props.tool === "center") {
		return (
			<span className="text-[max(calc(var(--controls-sm-width)*0.06),0px)] md:text-[max(calc(var(--controls-lg-height)*0.06),0px)]">
				{props.num}
			</span>
		);
	} else if (props.tool === "corner") {
		let spacing = "";
		if (props.num === 1 || props.num === 4 || props.num === 7) {
			spacing = "mr-auto ml-[calc(var(--controls-sm-width)*0.015)]";
		} else if (props.num === 3 || props.num === 6 || props.num === 9) {
			spacing =
				"ml-auto mr-[calc(var(--controls-sm-width)*0.015)] md:mr-[calc(var(--controls-lg-height)*0.015)]";
		}

		return (
			<span
				className={`text-[max(calc(var(--controls-sm-width)*0.06),0px)] md:text-[max(calc(var(--controls-lg-height)*0.06),0px)] ${spacing}`}
			>
				{props.num}
			</span>
		);
	} else if (props.tool === "color") {
		let backgrounds = [
			"bg-[#7851a9]",
			"bg-[#cfcfcf]",
			"bg-[#5f5f5f]",
			"bg-[#000000]",
			"bg-[#a3e048]",
			"bg-[#d23be7]",
			"bg-[#eb7532]",
			"bg-[#e6261f]",
			"bg-[#f7d038]",
			"bg-[#7eb7f8]",
		];
		return (
			<div className={`w-3/5 h-3/5 ${backgrounds[props.num as number]}`}></div>
		);
	} else {
		return (
			<span className="font-medium text-[max(calc(var(--controls-sm-width)*0.08),0px)] md:text-[max(calc(var(--controls-lg-height)*0.08),0px)]">
				{props.num}
			</span>
		);
	}
}

export default NumControl;
