function getBorderWidth(props: CellProps) {
	const [cellX, cellY] = [
		props.index % props.cols,
		Math.floor(props.index / props.cols),
	];

	let widths = { top: "0px", left: "0px", bottom: "1px", right: "1px" };

	if ((cellX + 1) % props.colBlock === 0) {
		widths.right = "3px";
	}
	if ((cellY + 1) % props.rowBlock == 0) {
		widths.bottom = "3px";
	}
	if (cellX + 1 === props.cols) {
		widths.right = "0px";
	}
	if (cellY + 1 === props.rows) {
		widths.bottom = "0px";
	}

	return `${widths.top} ${widths.right} ${widths.bottom} ${widths.left}`;
}

interface SelectedSides {
	top: boolean;
	bottom: boolean;
	left: boolean;
	right: boolean;
	topLeft: boolean;
	topRight: boolean;
	bottomLeft: boolean;
	bottomRight: boolean;
}

interface CellProps {
	index: number;
	sides: SelectedSides;
	selected: boolean;
	given: boolean;
	dragging: boolean;
	shifted: boolean;
	value: number;
	corners: Set<number>;
	center: Set<number>;
	allColors: string[];
	colors: Set<number>;
	onClick: (_x?: number, _y?: number, arrow?: boolean) => void;
	onDoubleClick: () => void;
	onDrag: () => void;
	cols: number;
	rows: number;
	colBlock: number;
	rowBlock: number;
}

function Cell(props: CellProps) {
	const [x, y] = [
		props.index % props.cols,
		Math.floor(props.index / props.cols),
	];

	const highlights = {
		top: !props.sides.top,
		bottom: !props.sides.bottom,
		left: !props.sides.left,
		right: !props.sides.right,
		topLeft: props.sides.top && props.sides.left && !props.sides.topLeft,
		topRight: props.sides.top && props.sides.right && !props.sides.topRight,
		bottomLeft:
			props.sides.bottom && props.sides.left && !props.sides.bottomLeft,
		bottomRight:
			props.sides.bottom && props.sides.right && !props.sides.bottomRight,
	};

	const corners = Array.from(props.corners).sort((a, b) => a - b);
	const center = Array.from(props.center);
	const colors = Array.from(props.colors);

	const gridOrder = [1, 3, 7, 9, 2, 8, 4, 6, 5];
	const textSizing = [
		...Array.from({ length: 5 }).map(() => {
			return "text-[max(calc(var(--grid-sm-width)*0.035),0px)] md:text-[max(calc(var(--grid-lg-width)*0.035),0px)]";
		}),
		"text-[max(calc(var(--grid-sm-width)*0.03),0px)] md:text-[max(calc(var(--grid-lg-width)*0.03),0px)]",
		"text-[max(calc(var(--grid-sm-width)*0.025),0px)] md:text-[max(calc(var(--grid-lg-width)*0.025),0px)]",
		"text-[max(calc(var(--grid-sm-width)*0.022),0px)] md:text-[max(calc(var(--grid-lg-width)*0.022),0px)]",
		"text-[max(calc(var(--grid-sm-width)*0.02),0px)] md:text-[max(calc(var(--grid-lg-width)*0.02),0px)]",
		"text-[max(calc(var(--grid-sm-width)*0.018),0px)] md:text-[max(calc(var(--grid-lg-width)*0.018),0px)]",
	];

	const cellColors = colors.map((colorNum) => props.allColors[colorNum]);

	return (
		<button
			aria-label={`Cell #${props.index + 1}`}
			data-x={x}
			data-y={y}
			className="relative border outline-none cell flex-center border-primary-800 dark:border-slate-500"
			style={{
				borderWidth: getBorderWidth(props),
			}}
			onMouseDown={() => props.onClick()}
			onDoubleClick={props.onDoubleClick}
		>
			<div
				className="absolute z-50 w-4/5 h-4/5"
				onMouseEnter={() => {
					if (props.dragging) {
						props.onDrag();
					}
				}}
			></div>
			{props.value !== 10 ? (
				<span
					className={`w-full h-full flex-center text-[max(calc(var(--grid-sm-width)*0.08),0px)] font-sudoku select-none z-40 md:text-[max(calc(var(--grid-lg-width)*0.08),0px)] ${
						props.given
							? "text-secondary-900 dark:text-slate-400"
							: "text-primary-500 dark:text-primary-400"
					}`}
				>
					{props.value}
				</span>
			) : (
				""
			)}
			{corners.length > 0 && props.value === 10 ? (
				<div className="absolute z-30 w-full h-full grid grid-cols-3 grid-rows-3">
					{Array.from({ length: 9 }).map((_e, i) => {
						return (
							<span
								key={i}
								className={`flex-center text-primary-400 text-[max(calc(var(--grid-sm-width)*0.04),0px)] md:text-[max(calc(var(--grid-lg-width)*0.035),0px)] ${
									i === 8 ? "translate-x-[-45%] translate-y-[-40%]" : ""
								}`}
								style={{
									order: gridOrder[i],
								}}
							>
								{corners[i]}
							</span>
						);
					})}
					<span
						className={`absolute flex-center w-1/3 h-1/3 top-1/2 left-1/2 translate-x-[-5%] translate-y-[-20%] text-primary-400 text-[max(calc(var(--grid-sm-width)*0.04),0px)] md:text-[max(calc(var(--grid-lg-width)*0.035),0px)] ${
							corners.length === 10 ? "!flex" : "!hidden"
						}`}
					>
						9
					</span>
				</div>
			) : (
				""
			)}
			{center.length > 0 && props.value === 10 ? (
				<div
					className={`absolute w-full h-full flex-center text-primary-400 ${
						textSizing[center.length - 1]
					} z-20`}
				>
					<div className="w-[95%]">{center.sort((a, b) => a - b).join("")}</div>
				</div>
			) : (
				""
			)}
			{props.selected && Object.values(highlights).some((v) => v === true) ? (
				<div className="absolute z-10 flex flex-col w-full h-full">
					<div className="w-full h-[calc(var(--grid-sm-width)*0.015)] flex md:h-[calc(var(--grid-lg-width)*0.015)]">
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.top || highlights.left || highlights.topLeft
									? "bg-opacity-100"
									: "bg-opacity-0"
							}`}
						></div>
						<div
							className={`flex-grow h-full bg-secondary-200 ${
								highlights.top ? "bg-opacity-100" : "bg-opacity-0"
							}`}
						></div>
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.top || highlights.right || highlights.topRight
									? "bg-opacity-100"
									: "bg-opacity-0"
							}`}
						></div>
					</div>
					<div className="flex flex-grow w-full">
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.left ? "bg-opacity-100" : "bg-opacity-0"
							}`}
						></div>
						<div className="flex-grow h-full"></div>
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.right ? "bg-opacity-100" : "bg-opacity-0"
							}`}
						></div>
					</div>
					<div className="w-full h-[calc(var(--grid-sm-width)*0.015)] flex md:h-[calc(var(--grid-lg-width)*0.015)]">
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.bottom || highlights.left || highlights.bottomLeft
									? "bg-opacity-100"
									: "bg-opacity-0"
							}`}
						></div>
						<div
							className={`flex-grow h-full bg-secondary-200 ${
								highlights.bottom ? "bg-opacity-100" : "bg-opacity-0"
							}`}
						></div>
						<div
							className={`w-[calc(var(--grid-sm-width)*0.015)] h-full md:w-[calc(var(--grid-lg-width)*0.015)] bg-secondary-200 ${
								highlights.bottom || highlights.right || highlights.bottomRight
									? "bg-opacity-100"
									: "bg-opacity-0"
							}`}
						></div>
					</div>
				</div>
			) : (
				""
			)}
			{colors.length > 0 ? (
				<div
					className="absolute w-full h-full"
					style={{
						backgroundImage: `conic-gradient(${[
							`${cellColors[cellColors.length - 1]} 0% 7%`,
							...cellColors.map((color, i) => {
								return `${color} ${(i * 100) / cellColors.length + 7.3}% ${
									((i + 1) * 100) / cellColors.length + 7
								}%`;
							}),
						].join()})`,
					}}
				></div>
			) : (
				""
			)}
		</button>
	);
}

export default Cell;
