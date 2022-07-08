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

interface CellProps {
	index: number;
	selected: boolean;
	given: boolean;
	dragging: boolean;
	isActive: boolean;
	shifted: boolean;
	value: number;
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

	return (
		<button
			className={`cell relative flex justify-center items-center border border-primary-800 bg-secondary-100 transition-colors outline-none ${
				props.selected
					? props.isActive
						? "bg-opacity-70 dark:bg-opacity-50"
						: "bg-opacity-40 dark:bg-opacity-30"
					: "bg-opacity-0"
			} dark:border-slate-500`}
			style={{
				borderWidth: getBorderWidth(props),
			}}
			onMouseDown={() => props.onClick()}
			onDoubleClick={props.onDoubleClick}
		>
			<div
				className="absolute w-5/6 h-5/6"
				onMouseEnter={() => {
					if (props.dragging && props.shifted) {
						props.onDrag();
					}
				}}
				onMouseMove={() => {
					if (props.dragging && !props.shifted) {
						props.onDrag();
					}
				}}
			></div>
			<span
				className={`w-full h-full flex justify-center items-center text-[4vh] font-sudoku select-none transition-colors md:text-[min(4vw,6vh)] ${
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
