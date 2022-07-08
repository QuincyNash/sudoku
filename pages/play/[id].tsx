import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import Header from "../../components/Header";
import Board from "../../components/Game";

export interface Puzzle {
	rows: number;
	cols: number;
	rowBlock: number;
	colBlock: number;
	board: number[];
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	function loadJSON(filePath: string) {
		const absolutePath = path.join(process.cwd(), filePath);
		const fileData = fs.readFileSync(absolutePath) as unknown as string;
		return JSON.parse(fileData);
	}

	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(loadJSON("admin.json")),
			databaseURL: "https://sudoku-dec29.firebaseio.com",
		});
	}

	const id = ctx.params?.id;

	const db = admin.firestore();
	const ref = db.doc(`puzzles/${id}`);
	const data = (await ref.get()).data() as Puzzle;

	if (!data) {
		return {
			redirect: {
				destination: "/play",
				permanent: true,
			},
		};
	}

	console.log("STATIC PROPS");

	return {
		props: {
			cols: data.cols,
			rows: data.rows,
			colBlock: data.colBlock,
			rowBlock: data.rowBlock,
			board: data.board,
		} as Puzzle,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	console.log("STATIC PATHS");
	return {
		paths: ["/play/1"],
		fallback: true,
	};
};

function Play(props: Puzzle) {
	const [isPaused, setIsPaused] = useState(false);

	return (
		<div className="w-screen h-screen flex flex-col transition-colors dark:bg-slate-900">
			<Header
				onPauseToggle={() => {
					setIsPaused(!isPaused);
				}}
				paused={isPaused}
			></Header>
			<Board
				rows={props.rows}
				cols={props.cols}
				rowBlock={props.rowBlock}
				colBlock={props.colBlock}
				board={props.board}
			></Board>
		</div>
	);
}

export default Play;
