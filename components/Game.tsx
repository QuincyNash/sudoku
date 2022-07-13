import React, { useCallback, useEffect, useState } from "react";
import { Puzzle } from "../pages/play/[id]";
import Cell from "./Cell";
import Controls from "./Controls";

let activeX = NaN;
let activeY = NaN;

interface CellObject {
	selected: boolean;
	given: boolean;
	value: number;
	corners: number[];
	center: number[];
	color: number;
}

interface GameState {
	cells: CellObject[][];
	activeX: number;
	activeY: number;
}

function Game(props: Puzzle) {
	const _cells: CellObject[][] = [];

	console.log("RENDER");

	const { cols, rows, board, colBlock, rowBlock } = props;

	for (let y = 0; y < rows; y++) {
		let row: CellObject[] = [];
		for (let x = 0; x < cols; x++) {
			let cell = board[y * props.cols + x];
			row.push({
				selected: false,
				given: cell !== 0,
				value: cell === 0 ? 10 : cell,
				corners: [],
				center: [],
				color: NaN,
			});
		}
		_cells.push(row);
	}

	const [cells, setCells] = useState(_cells);
	const [cellStates, setCellStates] = useState([_cells]);
	const [stateIndex, setStateIndex] = useState(0);

	const [tool, setTool] = useState("num");
	const [dragging, setDragging] = useState(false);
	const [shifted, setShifted] = useState(false);
	const [shiftLock, setShiftLock] = useState(false);

	const [metaKeys, setMetaKeys] = useState({
		alt: false,
		ctrl: false,
		meta: false,
		shift: false,
	});

	const isShifted = useCallback(() => {
		return shifted || shiftLock;
	}, [shiftLock, shifted]);

	const getTool = useCallback(() => {
		if ((metaKeys.ctrl || metaKeys.meta) && (metaKeys.alt || metaKeys.shift)) {
			return "color";
		} else if (metaKeys.ctrl || metaKeys.meta) {
			return "center";
		} else if (metaKeys.alt || metaKeys.shift) {
			return "corner";
		} else {
			return tool;
		}
	}, [metaKeys.alt, metaKeys.ctrl, metaKeys.meta, metaKeys.shift, tool]);

	const saveCells = useCallback(
		(newCells: CellObject[][]) => {
			let newCellStates: CellObject[][][] = JSON.parse(
				JSON.stringify(cellStates)
			);

			newCellStates[stateIndex + 1] = newCells;
			newCellStates = newCellStates.slice(0, stateIndex + 2);

			setCells(newCells);
			setCellStates(newCellStates);
			setStateIndex(stateIndex + 1);
		},
		[cellStates, stateIndex]
	);

	const undo = useCallback(() => {
		if (stateIndex > 0) {
			setStateIndex(stateIndex - 1);
			setCells(cellStates[stateIndex - 1]);
		}
	}, [cellStates, stateIndex]);

	const redo = useCallback(() => {
		if (stateIndex < cellStates.length - 1) {
			setStateIndex(stateIndex + 1);
			setCells(cellStates[stateIndex + 1]);
		}
	}, [cellStates, stateIndex]);

	const onCellClick = useCallback(
		(_x: number, _y: number, arrow = false) => {
			if (dragging) return;

			let newCells: CellObject[][] = JSON.parse(JSON.stringify(cells));

			let selectedCount = 0;
			for (let ypos = 0; ypos < rows; ypos++) {
				for (let xpos = 0; xpos < cols; xpos++) {
					selectedCount += newCells[ypos][xpos].selected ? 1 : 0;
				}
			}

			for (let ypos = 0; ypos < rows; ypos++) {
				for (let xpos = 0; xpos < cols; xpos++) {
					if (xpos === _x && ypos === _y) {
						if (selectedCount === 1 || (isShifted() && !arrow)) {
							newCells[_y][_x].selected = !newCells[_y][_x].selected;
						} else {
							newCells[_y][_x].selected = true;
						}

						activeX = _x;
						activeY = _y;
					} else if (!isShifted()) {
						newCells[ypos][xpos].selected = false;
					}
				}
			}

			setCells(newCells);
		},
		[dragging, cells, rows, cols, isShifted]
	);

	const enterNumber = useCallback(
		(num: number) => {
			if ((num <= cols && num <= rows) || num === 10) {
				let newCells: CellObject[][] = JSON.parse(JSON.stringify(cells));
				console.log(getTool());

				for (let ypos = 0; ypos < rows; ypos++) {
					for (let xpos = 0; xpos < cols; xpos++) {
						if (!newCells[ypos][xpos].given && newCells[ypos][xpos].selected) {
							if (getTool() === "num") {
								newCells[ypos][xpos].value = num;
							} else if (getTool() === "corner") {
								let index = newCells[ypos][xpos].corners.indexOf(num);

								if (index === -1) {
									newCells[ypos][xpos].corners.push(num);
								} else {
									newCells[ypos][xpos].corners.splice(index, 1);
								}

								if (num === 10) {
									newCells[ypos][xpos].corners = [];
								}
							} else if (getTool() === "center") {
								let index = newCells[ypos][xpos].center.indexOf(num);

								if (index === -1) {
									newCells[ypos][xpos].center.push(num);
								} else {
									newCells[ypos][xpos].center.splice(index, 1);
								}

								if (num === 10) {
									newCells[ypos][xpos].center = [];
								}
							}
						}
					}
				}
				saveCells(newCells);
			}
		},
		[cells, cols, getTool, rows, saveCells]
	);

	useEffect(() => {
		const mouseUp = () => {
			setDragging(false);
		};

		const mouseLeave = () => setDragging(false);

		const mouseDown = (e: React.MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.tagName === "MAIN" || target.classList.contains("header")) {
				let newCells: CellObject[][] = JSON.parse(JSON.stringify(cells));

				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < cols; x++) {
						newCells[y][x].selected = false;
					}
				}
				activeX = NaN;
				activeY = NaN;

				setCells(newCells);
			}
			setDragging(true);
		};

		const keyUp = (e: React.KeyboardEvent) => {
			if (e.key == "Shift" && !e.repeat && !dragging) {
				setShifted(false);
			}

			if (
				e.key === "Shift" ||
				e.key === "Alt" ||
				e.key === "Control" ||
				e.key === "Meta"
			) {
				setMetaKeys({
					alt: e.altKey,
					ctrl: e.ctrlKey,
					shift: e.shiftKey,
					meta: e.metaKey,
				});
			}
		};

		const keyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Tab") {
				let newIndex = activeY * cols + activeX + (e.shiftKey ? -1 : 1);
				newIndex = (newIndex + rows * cols) % (rows * cols);
				let newX = newIndex % cols;
				let newY = Math.floor(newIndex / cols);

				(
					document.querySelectorAll(".cell")[
						newY * cols + newX
					] as HTMLButtonElement
				).focus();

				onCellClick(newX, newY, true);
			}

			if (e.repeat) return;
			if (e.key === "Shift" && !dragging) {
				setShifted(true);
			}

			if (
				e.key === "Shift" ||
				e.key === "Alt" ||
				e.key === "Control" ||
				e.key === "Meta"
			) {
				setMetaKeys({
					alt: e.altKey,
					ctrl: e.ctrlKey,
					shift: e.shiftKey,
					meta: e.metaKey,
				});
			}

			if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
			}

			if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();

				let newCells: CellObject[][] = JSON.parse(JSON.stringify(cells));
				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < cols; x++) {
						newCells[y][x].selected = true;
					}
				}
				setCells(newCells);
			}

			if (e.key === " ") {
				let tools = ["num", "corner", "center", "color"];
				let toolIndex = tools.indexOf(getTool());
				let newIndex = (toolIndex + 1) % tools.length;
				setTool(tools[newIndex]);
			}

			if (e.key === "ArrowLeft") {
				let newX = (activeX - 1 + cols) % cols;
				onCellClick(newX, activeY, true);
			} else if (e.key === "ArrowRight") {
				let newX = (activeX + 1) % cols;
				onCellClick(newX, activeY, true);
			} else if (e.key === "ArrowUp") {
				let newY = (activeY - 1 + cols) % cols;
				onCellClick(activeX, newY, true);
			} else if (e.key === "ArrowDown") {
				let newY = (activeY + 1) % cols;
				onCellClick(activeX, newY, true);
			}

			e.preventDefault();

			let key: number;
			if (e.key === "Backspace") {
				key = 10;
			} else if (!isNaN(parseInt(e.code.slice(-1)))) {
				key = parseInt(e.code.slice(-1));
			} else {
				return;
			}

			enterNumber(key);
		};

		document.addEventListener("mousedown", mouseDown as any);
		document.addEventListener("mouseup", mouseUp);
		document.addEventListener("mouseleave", mouseLeave);
		document.addEventListener("keydown", keyDown as any);
		document.addEventListener("keyup", keyUp as any);

		return () => {
			document.removeEventListener("mousedown", mouseDown as any);
			document.removeEventListener("mouseup", mouseUp);
			document.removeEventListener("mouseleave", mouseLeave);
			document.removeEventListener("keydown", keyDown as any);
			document.removeEventListener("keyup", keyUp as any);
		};
	}, [
		cells,
		cols,
		getTool,
		dragging,
		enterNumber,
		onCellClick,
		redo,
		rows,
		shifted,
		tool,
		undo,
	]);

	return (
		<main className="w-full h-full flex flex-col justify-center items-center gap-[min(6vw,4vh)] md:gap-[3vw] md:flex-row">
			<div className="relative w-grid-sm aspect-square border-[3px] border-primary-800 md:w-grid-lg transition-colors dark:border-slate-500">
				<div
					className="absolute inset-0 grid"
					style={{
						gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
						gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
					}}
				>
					{Array.from({ length: cols * rows }).map((_e, i) => {
						const [x, y] = [i % cols, Math.floor(i / cols)];

						return (
							<Cell
								key={i}
								index={i}
								selected={cells[y][x].selected}
								sides={{
									top: y > 0 ? cells[y - 1][x].selected : false,
									bottom: y < rows - 1 ? cells[y + 1][x].selected : false,
									left: x > 0 ? cells[y][x - 1].selected : false,
									right: x < cols - 1 ? cells[y][x + 1].selected : false,
									topLeft:
										x > 0 && y > 0 ? cells[y - 1][x - 1].selected : false,
									topRight:
										x < cols - 1 && y > 0
											? cells[y - 1][x + 1].selected
											: false,
									bottomLeft:
										x > 0 && y < rows - 1
											? cells[y + 1][x - 1].selected
											: false,
									bottomRight:
										x < cols - 1 && y < rows - 1
											? cells[y + 1][x + 1].selected
											: false,
								}}
								given={cells[y][x].given}
								value={cells[y][x].value}
								corners={cells[y][x].corners}
								center={cells[y][x].center}
								color={cells[y][x].color}
								dragging={dragging}
								shifted={isShifted()}
								onClick={() => onCellClick(x, y)}
								onDoubleClick={() => {
									let newCells: CellObject[][] = JSON.parse(
										JSON.stringify(cells)
									);

									const value = newCells[y][x].value;
									if (value === 10) return;

									let count = 0;
									for (let ypos = 0; ypos < rows; ypos++) {
										for (let xpos = 0; xpos < cols; xpos++) {
											if (newCells[ypos][xpos].value === value) {
												count += 1;
											}
										}
									}

									if (count === 1) return;

									for (let ypos = 0; ypos < rows; ypos++) {
										for (let xpos = 0; xpos < cols; xpos++) {
											if (newCells[ypos][xpos].value === value) {
												newCells[ypos][xpos].selected = true;
											}
										}
									}
									setCells(newCells);
								}}
								onDrag={() => {
									let newCells: CellObject[][] = JSON.parse(
										JSON.stringify(cells)
									);
									(
										document.querySelectorAll(".cell")[
											y * cols + x
										] as HTMLButtonElement
									).focus();
									activeX = x;
									activeY = y;

									newCells[y][x].selected = isShifted()
										? !newCells[y][x].selected
										: true;
									setCells(newCells);
								}}
								cols={cols}
								rows={rows}
								colBlock={colBlock}
								rowBlock={rowBlock}
							></Cell>
						);
					})}
				</div>
			</div>
			<Controls
				shiftLock={shiftLock}
				enterNumber={enterNumber}
				changeTool={setTool}
				toggleShiftLock={() => setShiftLock(!shiftLock)}
				undo={undo}
				redo={redo}
				tool={getTool()}
			></Controls>
		</main>
	);
}

export default Game;
