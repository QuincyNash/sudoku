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
	dragging: boolean;
	shifted: boolean;
	value: number;
	onKey: (key: number) => void;
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
			className={`cell border border-primary-800 bg-secondary-100 transition-colors outline-none ${
				props.selected ? "bg-opacity-30" : "bg-opacity-0"
			}`}
			style={{
				borderWidth: getBorderWidth(props),
			}}
			onMouseDown={() => props.onClick()}
			onMouseEnter={() => {
				if (props.shifted && props.dragging) {
					props.onDrag();
				}
			}}
			onMouseMove={() => {
				if (props.dragging && !props.shifted) {
					props.onDrag();
				}
			}}
			onDoubleClick={props.onDoubleClick}
			onKeyDown={(e) => {
				e.preventDefault();
				if (e.repeat) return;

				if (e.key === "Enter") {
					props.onClick();
				} else if (e.key === "Escape") {
					props.onDoubleClick();
				} else if (!isNaN(parseInt(e.key)) && parseInt(e.key) !== 0) {
					props.onKey(parseInt(e.key));
				} else if (e.key === "Backspace") {
					props.onKey(0);
				} else if (e.key === "ArrowLeft") {
					let newX = (x - 1 + props.cols) % props.cols;

					(
						document.querySelectorAll(".cell")[
							y * props.cols + newX
						] as HTMLButtonElement
					).focus();

					props.onClick(newX, y);
				} else if (e.key === "ArrowRight") {
					let newX = (x + 1) % props.cols;

					(
						document.querySelectorAll(".cell")[
							y * props.cols + newX
						] as HTMLButtonElement
					).focus();

					props.onClick(newX, y);
				} else if (e.key === "ArrowUp") {
					let newY = (y - 1 + props.cols) % props.cols;

					(
						document.querySelectorAll(".cell")[
							newY * props.cols + x
						] as HTMLButtonElement
					).focus();

					props.onClick(x, newY);
				} else if (e.key === "ArrowDown") {
					let newY = (y + 1) % props.cols;

					(
						document.querySelectorAll(".cell")[
							newY * props.cols + x
						] as HTMLButtonElement
					).focus();

					props.onClick(x, newY);
				}
			}}
		>
			<span className="w-full h-full flex justify-center items-center text-primary-900 text-[4vh] font-sudoku select-none md:text-[min(4vw,6vh)]">
				{props.value === 0 ? "" : props.value}
			</span>
		</button>
	);
}

export default Cell;
