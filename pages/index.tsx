import { useState } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import Controls from "../components/Controls";

function Home() {
	const [isPaused, setIsPaused] = useState(false);

	return (
		<div suppressHydrationWarning className="w-screen h-screen flex flex-col">
			<Header
				onPauseToggle={() => {
					setIsPaused(!isPaused);
				}}
				paused={isPaused}
			></Header>
			<main className="w-full h-full flex flex-col justify-center items-center gap-[2vh] md:gap-4 md:flex-row">
				<Board></Board>
				<Controls></Controls>
			</main>
		</div>
	);
}

export default Home;
