interface BannerProps {
	name: string;
	author: string;
	hideSmall: boolean;
	maxWidth?: string;
	height?: string;
}

function Banner(props: BannerProps) {
	return (
		<div
			className={`w-full ${
				props.hideSmall ? "hidden md:flex" : "flex"
			} md:flex-col`}
			style={{
				maxWidth: props.maxWidth,
			}}
		>
			<div
				className="flex w-full max-h-full text-secondary-600"
				style={{
					height: props.height
						? props.height
						: "calc(var(--controls-lg-height) * 0.12)",
				}}
			>
				<div className="aspect-[7/10]">
					<svg viewBox="0 0 70 100">
						<path
							fill="currentColor"
							d="M 30 0 L 70 0 L 70 100 L 30 100 L 50 50 L 30 0"
						></path>
						<path
							fill="currentColor"
							d="M0 25 L30,25 L40,50 L30,75 L0,75 L10,50 L0,25"
						></path>
					</svg>
				</div>
				<div className="flex-grow h-full overflow-hidden bg-current flex-center">
					<p
						className="overflow-hidden text-center text-white whitespace-nowrap overflow-ellipsis font-cursive"
						style={{
							fontSize: props.height
								? `calc(${props.height} * 0.3)`
								: "calc(var(--controls-lg-height) * 0.04)",
							lineHeight: props.height
								? `calc(${props.height} * 0.4)`
								: "calc(var(--controls-lg-height)*0.05)",
						}}
						title={`${props.name} by ${props.author}`}
					>
						{props.name}
						<br></br>
						by {props.author}
					</p>
				</div>
				<div className="aspect-[7/10]">
					<svg viewBox="0 0 70 100">
						<g transform="scale(-1, 1) translate(-70, 0)">
							<path
								fill="currentColor"
								d="M 30 0 L 70 0 L 70 100 L 30 100 L 50 50 L 30 0"
							></path>
							<path
								fill="currentColor"
								d="M0 25 L30,25 L40,50 L30,75 L0,75 L10,50 L0,25"
							></path>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default Banner;
