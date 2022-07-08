import React, { useCallback, useEffect, useState } from "react";
import { Puzzle } from "../pages/play/[id]";
import Cell from "./Cell";
import Controls from "./Controls";

let activeX = 0;
let activeY = 0;

interface CellObject {
	selected: boolean;
	given: boolean;
	value: number;
}

function Board(props: Puzzle) {
	const _cells: CellObject[][] = [];

	const { cols, rows, board, colBlock, rowBlock } = props;

	for (let y = 0; y < rows; y++) {
		let row: CellObject[] = [];
		for (let x = 0; x < cols; x++) {
			let cell = board[y * props.cols + x];
			row.push({
				selected: false,
				given: cell !== 0,
				value: cell === 0 ? 10 : cell,
			});
		}
		_cells.push(row);
	}

	const [cells, setCells] = useState(_cells);
	const [tool, setTool] = useState("color");
	const [dragging, setDragging] = useState(false);
	const [shifted, setShifted] = useState(false);

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
						if (selectedCount === 1 || (shifted && !arrow)) {
							newCells[_y][_x].selected = !newCells[_y][_x].selected;
						} else {
							newCells[_y][_x].selected = true;
						}

						activeX = _x;
						activeY = _y;
					} else if (!shifted) {
						newCells[ypos][xpos].selected = false;
					}
				}
			}

			setCells(newCells);
		},
		[dragging, cells, rows, cols, shifted]
	);

	const enterNumber = useCallback(
		(num: number) => {
			if ((num <= cols && num <= rows) || num === 10) {
				let newCells: CellObject[][] = JSON.parse(JSON.stringify(cells));
				for (let ypos = 0; ypos < rows; ypos++) {
					for (let xpos = 0; xpos < cols; xpos++) {
						if (newCells[ypos][xpos].selected && !newCells[ypos][xpos].given) {
							newCells[ypos][xpos].value = num;
						}
					}
				}
				setCells(newCells);
			}
		},
		[cells, cols, rows]
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

				setCells(newCells);
			}
			setDragging(true);
		};

		const keyUp = (e: React.KeyboardEvent) => {
			if (e.key == "Alt" && !e.repeat && !dragging) {
				setShifted(false);
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
			if (e.key === "Alt" && !dragging) {
				setShifted(true);
			}

			if (e.key === " ") {
				let tools = ["num", "corner", "center", "color"];
				let toolIndex = tools.indexOf(tool);
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

			let key: number;
			if (e.key === "Backspace") {
				key = 10;
			} else if (!isNaN(parseInt(e.key))) {
				key = parseInt(e.key);
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
	}, [cells, cols, dragging, enterNumber, onCellClick, rows, shifted, tool]);

	return (
		<main className="w-full h-full flex flex-col justify-center items-center gap-[min(6vw,4vh)] md:gap-[3vw] md:flex-row">
			<div className="relative w-[min(52vh,85vw)] aspect-square border-[3px] border-primary-800 md:w-[min(60%,82vh)] transition-colors dark:border-slate-500">
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
								given={cells[y][x].given}
								value={cells[y][x].value}
								isActive={activeX === x && activeY === y}
								dragging={dragging}
								shifted={shifted}
								onClick={() => onCellClick(x, y)}
								onDoubleClick={() => {
									let newCells: CellObject[][] = JSON.parse(
										JSON.stringify(cells)
									);

									const value = newCells[y][x].value;
									if (value === 10) return;

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

									newCells[y][x].selected = shifted
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
				enterNumber={enterNumber}
				changeTool={setTool}
				tool={tool}
			></Controls>
		</main>
	);
}

export default Board;
