import { parse } from "path";
import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const cols = 9;
const rows = 9;
const colBlock = 3;
const rowBlock = 3;

interface CellObject {
	selected: boolean;
	value: number;
}

function Board() {
	const [cells, setCells] = useState(
		Array.from(Array(cols), () =>
			new Array(rows).fill({
				selected: false,
				value: 0,
			})
		) as CellObject[][]
	);

	const [dragging, setDragging] = useState(false);
	const [shifted, setShifted] = useState(false);

	useEffect(() => {
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

		const mouseUp = () => {
			setDragging(false);
		};

		const mouseLeave = () => setDragging(false);

		const keyDown = (e: React.KeyboardEvent) => {
			if (e.key == "Shift" && !e.repeat && !dragging) {
				setShifted(true);
			}
		};

		const keyUp = (e: React.KeyboardEvent) => {
			if (e.key == "Shift" && !e.repeat && !dragging) {
				setShifted(false);
			}
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
	});

	return (
		<div className="relative w-[57vh] aspect-square border-[3px] border-primary-800 md:w-[min(60%,85vh)]">
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
							value={cells[y][x].value}
							dragging={dragging}
							shifted={shifted}
							onClick={(_x = x, _y = y, arrow = false) => {
								if (dragging) return;

								let newCells: CellObject[][] = JSON.parse(
									JSON.stringify(cells)
								);

								let selectedCount = 0;
								for (let ypos = 0; ypos < rows; ypos++) {
									for (let xpos = 0; xpos < cols; xpos++) {
										selectedCount += newCells[ypos][xpos].selected ? 1 : 0;
									}
								}

								for (let ypos = 0; ypos < rows; ypos++) {
									for (let xpos = 0; xpos < cols; xpos++) {
										if (xpos === _x && ypos === _y) {
											if (selectedCount === 1 || shifted) {
												newCells[_y][_x].selected = !newCells[_y][_x].selected;
											} else {
												newCells[_y][_x].selected = true;
											}
										} else if (!shifted) {
											newCells[ypos][xpos].selected = false;
										}
									}
								}

								setCells(newCells);
							}}
							onDoubleClick={() => {
								let newCells: CellObject[][] = JSON.parse(
									JSON.stringify(cells)
								);
								const value = newCells[y][x].value;

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

								newCells[y][x].selected = shifted
									? !newCells[y][x].selected
									: true;
								setCells(newCells);
							}}
							onKey={(key: number) => {
								let newCells: CellObject[][] = JSON.parse(
									JSON.stringify(cells)
								);
								newCells[y][x].value = key;
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
	);
}

export default Board;
