import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import admin from "firebase-admin";
import Header from "../../components/Header";
import Game from "../../components/Game";
import initApp from "../../lib/firebase";
import { useRouter } from "next/router";

export interface Puzzle {
	rows: number;
	cols: number;
	rowBlock: number;
	colBlock: number;
	board: number[];
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	initApp();
	const db = admin.firestore();

	const id = ctx.params?.id;

	const ref = db.doc(`puzzles/${id}`);
	const data = (await ref.get()).data() as Puzzle;

	if (!data) {
		return {
			redirect: {
				destination: "/api/random",
				permanent: true,
			},
		};
	}

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
	initApp();
	const db = admin.firestore();

	const paths: string[] = [];

	const collection = await db.collection("puzzles").get();
	collection.forEach((doc) => {
		paths.push(`/play/${doc.id}`);
	});

	return {
		paths,
		fallback: true,
	};
};

function Play(props: Puzzle) {
	const [isPaused, setIsPaused] = useState(false);

	if (!props.board) return null;

	return (
		<div className="w-screen h-screen flex flex-col transition-colors dark:bg-slate-900">
			<Header
				onPauseToggle={() => {
					setIsPaused(!isPaused);
				}}
				paused={isPaused}
			></Header>
			<Game
				rows={props.rows}
				cols={props.cols}
				rowBlock={props.rowBlock}
				colBlock={props.colBlock}
				board={props.board}
			></Game>
		</div>
	);
}

export default Play;
