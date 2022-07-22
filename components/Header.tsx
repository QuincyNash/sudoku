import React from "react";

interface HeaderProps {
	paused: boolean;
	onPauseToggle: React.MouseEventHandler;
}

function Header(props: HeaderProps) {
	return (
		<header className="sticky top-0 flex items-center flex-shrink-0 w-full h-10 transition-colors header bg-primary-400 dark:bg-primary-600">
			<button
				aria-label="Menu"
				title="Menu"
				className="w-6 h-6 ml-4 outline-none transition-colors text-primary-800 dark:text-slate-200"
			>
				<svg width="24" height="24">
					<path d="M0 0h24v24H0V0z" fill="none"></path>
					<path
						d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
						fill="currentColor"
					></path>
				</svg>
			</button>
			<div className="flex items-center h-full ml-auto mr-4">
				<label
					htmlFor="toggle"
					title={props.paused ? "Unpause" : "Pause"}
					className="pr-2 text-lg cursor-pointer select-none transition-colors text-primary-900 dark:text-slate-200"
				>
					00:15
				</label>
				<button
					onClick={props.onPauseToggle}
					aria-label={props.paused ? "Unpause" : "Pause"}
					title={props.paused ? "Unpause" : "Pause"}
					id="toggle"
					className="w-6 h-6 outline-none transition-colors text-primary-900 dark:text-slate-100"
				>
					<svg>
						<path
							d={
								props.paused
									? "M10.8 15.9l4.67-3.5c.27-.2.27-.6 0-.8L10.8 8.1c-.33-.25-.8-.01-.8.4v7c0 .41.47.65.8.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
									: "M10 16c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1zm2-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-4c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1z"
							}
							fill="currentColor"
						></path>
					</svg>
				</button>
			</div>
		</header>
	);
}

export default Header;
