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
	corners: number[];
	center: number[];
	color: number;
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

	const corners = props.corners.sort((a, b) => a - b);
	const gridOrder = [1, 3, 7, 9, 2, 8, 4, 6, 5];

	return (
		<button
			className="cell relative flex-center border border-primary-800  outline-none dark:border-slate-500"
			style={{
				borderWidth: getBorderWidth(props),
			}}
			onMouseDown={() => props.onClick()}
			onDoubleClick={props.onDoubleClick}
		>
			<div
				className="absolute w-4/5 h-4/5 z-50"
				onMouseEnter={() => {
					if (props.dragging && props.shifted) {
						props.onDrag();
						console.log("DRAG");
					}
				}}
				onMouseMove={() => {
					if (props.dragging && !props.shifted) {
						props.onDrag();
						console.log("DRAG");
					}
				}}
			></div>
			<div
				className={`absolute w-full h-full flex flex-col ${
					props.selected ? "block" : "hidden"
				}`}
			>
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
				<div className="w-full flex-grow flex">
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
			<div className="absolute w-full h-full grid grid-cols-3 grid-rows-3">
				{Array.from({ length: 9 }).map((_e, i) => {
					return (
						<span
							key={i}
							className={`flex-center text-primary-400 text-[max(calc(var(--grid-sm-width)*0.04),0px)] md:text-[max(calc(var(--grid-lg-width)*0.035),0px)] ${
								i === 8 ? "-translate-x-1/3 -translate-y-1/3" : ""
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
					className={`absolute w-1/3 h-1/3 top-1/2 left-1/2 translate-x-[-16.666%] translate-y-[-16.666%] flex-center text-primary-400 text-[max(calc(var(--grid-sm-width)*0.04),0px)] md:text-[max(calc(var(--grid-lg-width)*0.035),0px)] ${
						corners.length === 10 ? "!block" : "!hidden"
					}`}
				>
					9
				</span>
			</div>
			<span
				className={`w-full h-full flex-center text-[4vh] font-sudoku select-none  md:text-[min(4vw,6vh)] ${
					props.given
						? "text-secondary-900 dark:text-slate-400"
						: "text-primary-500 dark:text-primary-400"
				}`}
			>
				{props.value === 10 ? "" : props.value}
			</span>
		</button>
	);
}

export default Cell;
