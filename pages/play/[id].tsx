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
	if (admin.apps.length === 0) {
		console.log();
		admin.initializeApp({
			credential: admin.credential.cert({
				type: process.env.FIREBASE_TYPE,
				project_id: process.env.FIREBASE_PROJECT_ID,
				private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
				private_key: (process.env.FIREBASE_PRIVATE_KEY as any).replace(
					/\\n/g,
					"\n"
				),
				client_email: process.env.FIREBASE_CLIENT_EMAIL,
				client_id: process.env.FIREBASE_CLIENT_ID,
				auth_uri: process.env.FIREBASE_AUTH_URI,
				token_uri: process.env.FIREBASE_TOKEN_URI,
				auth_provider_x509_cert_url:
					process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
				client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
			} as any),
			databaseURL: process.env.FIREBASE_DATABASE_URL,
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
