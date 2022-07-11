import screenfull from "screenfull";
import Tool from "./Game";
import SmallControl from "./ControlButtons/SmallControl";
import NumControl from "./ControlButtons/NumControl";
import ToolControl from "./ControlButtons/ToolControl";
import AuxControl from "./ControlButtons/AuxControl";
import { auth } from "firebase-admin";

interface ControlsProps {
	enterNumber: (num: number) => void;
	changeTool: (tool: string) => void;
	toggleShiftLock: () => void;
	shiftLock: boolean;
	undo: () => void;
	redo: () => void;
	tool: string;
}

function Controls(props: ControlsProps) {
	return (
		<div className="flex flex-row justify-between items-center w-controls-sm h-controls-sm md:w-controls-lg md:h-controls-lg md:flex-col">
			<div className="w-[calc(var(--controls-sm-height)*0.18)] h-full grid grid-cols-1 grid-rows-5 gap-[calc(var(--controls-sm-height)*0.02)] md:grid-cols-5 md:grid-rows-1 md:w-11/12 md:h-auto md:flex-row md:gap-[calc(var(--controls-lg-width)*0.02)] md:mr-auto">
				<SmallControl>
					<svg viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M 22.847656 14.796875 L 20.851562 13.644531 C 21.050781 12.558594 21.050781 11.441406 20.851562 10.355469 L 22.847656 9.203125 C 23.078125 9.070312 23.179688 8.796875 23.105469 8.546875 C 22.585938 6.875 21.699219 5.367188 20.539062 4.109375 C 20.363281 3.917969 20.070312 3.871094 19.847656 4.003906 L 17.851562 5.15625 C 17.011719 4.433594 16.046875 3.875 15 3.511719 L 15 1.210938 C 15 0.945312 14.816406 0.71875 14.558594 0.660156 C 12.839844 0.277344 11.078125 0.296875 9.441406 0.660156 C 9.183594 0.71875 9 0.945312 9 1.210938 L 9 3.515625 C 7.960938 3.886719 6.992188 4.445312 6.148438 5.160156 L 4.15625 4.007812 C 3.929688 3.875 3.640625 3.917969 3.464844 4.117188 C 2.304688 5.367188 1.421875 6.875 0.898438 8.550781 C 0.820312 8.804688 0.929688 9.074219 1.15625 9.207031 L 3.15625 10.359375 C 2.953125 11.445312 2.953125 12.5625 3.15625 13.648438 L 1.15625 14.804688 C 0.929688 14.933594 0.824219 15.207031 0.898438 15.460938 C 1.421875 17.128906 2.304688 18.636719 3.464844 19.894531 C 3.640625 20.085938 3.933594 20.132812 4.15625 20 L 6.15625 18.847656 C 6.992188 19.570312 7.960938 20.128906 9.003906 20.492188 L 9.003906 22.800781 C 9.003906 23.0625 9.1875 23.292969 9.445312 23.347656 C 11.164062 23.734375 12.929688 23.714844 14.5625 23.347656 C 14.820312 23.292969 15.003906 23.0625 15.003906 22.800781 L 15.003906 20.492188 C 16.046875 20.125 17.011719 19.566406 17.855469 18.847656 L 19.851562 20 C 20.082031 20.132812 20.367188 20.089844 20.546875 19.894531 C 21.703125 18.640625 22.589844 17.132812 23.109375 15.460938 C 23.179688 15.203125 23.078125 14.929688 22.847656 14.796875 Z M 12 15.75 C 9.933594 15.75 8.25 14.066406 8.25 12 C 8.25 9.933594 9.933594 8.25 12 8.25 C 14.066406 8.25 15.75 9.933594 15.75 12 C 15.75 14.066406 14.066406 15.75 12 15.75 Z M 12 15.75 "
						/>
					</svg>
				</SmallControl>
				<SmallControl
					onClick={() => {
						screenfull.toggle().then(() => {
							let goFull = document.querySelector("#go-full") as SVGElement;
							let leaveFull = document.querySelector(
								"#leave-full"
							) as SVGElement;
							for (let button of [goFull, leaveFull]) {
								button.classList.toggle("visible");
								button.classList.toggle("hidden");
							}
						});
					}}
				>
					<svg viewBox="0 0 24 24" id="go-full" className="visible">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"
						></path>
					</svg>
					<svg viewBox="0 0 24 24" id="leave-full" className="hidden">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M6 16h2v2c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm2-8H6c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1s-1 .45-1 1v2zm7 11c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm1-11V6c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2z"
						></path>
					</svg>
				</SmallControl>
				<SmallControl>
					<svg viewBox="0 0 24 24" className="w-full h-full">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
						></path>
					</svg>
				</SmallControl>
				<SmallControl>
					<svg viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"
						></path>
					</svg>
				</SmallControl>
				<SmallControl>
					<svg viewBox="0 0 24 24">
						<mask id="cutout">
							<rect width="100%" height="100%" fill="#fff"></rect>
							<path
								d="M12 9c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V10c0-.55.45-1 1-1zM12 21zm1-3h-2v-2h2v2z"
								strokeWidth="1.5"
								stroke="#000"
								fill="currentColor"
							></path>
						</mask>
						<path
							mask="url(#cutout)"
							fill="currentColor"
							d="M12 5V2.21c0-.45-.54-.67-.85-.35l-3.8 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.32.31.86.09.86-.36V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.07-.48-.49-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24C20.84 9.48 16.94 5 12 5z"
						></path>
						<path
							fill="currentColor"
							d="M12 9c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V10c0-.55.45-1 1-1zM12 21zm1-3h-2v-2h2v2z"
						></path>
					</svg>
				</SmallControl>
			</div>
			<div className="order-3 md:order-2 w-[calc(var(--controls-sm-height)*1.04)] h-full flex justify-between md:w-full md:h-[calc(var(--controls-lg-width)*0.96)]">
				<div className="w-[calc(var(--controls-sm-height)*0.75)] h-full grid grid-cols-3 grid-rows-4 gap-[calc(var(--controls-sm-height)*0.02)] md:w-[calc(var(--controls-lg-width)*0.715)] md:gap-[calc(var(--controls-lg-width)*0.025)]">
					{Array.from({ length: 11 }).map((_e, i) => {
						if (i === 10) {
							return (
								<NumControl
									key={i}
									isDelete={true}
									onClick={() => props.enterNumber(10)}
								></NumControl>
							);
						} else if (i === 9) {
							return (
								<NumControl
									key={i}
									num={0}
									onClick={() => props.enterNumber(0)}
								></NumControl>
							);
						}
						return (
							<NumControl
								key={i}
								num={i + 1}
								onClick={() => props.enterNumber(i + 1)}
							></NumControl>
						);
					})}
				</div>
				<div className="w-[calc(var(--controls-sm-height)*0.225)] h-full grid grid-cols-1 grid-rows-4 gap-[calc(var(--controls-sm-height)*0.02)] md:w-[calc(var(--controls-lg-width)*0.225)] md:gap-[calc(var(--controls-lg-width)*0.025)]">
					<ToolControl
						isActive={props.tool === "num"}
						onClick={() => props.changeTool("num")}
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path fill="none" d="M0 0h24v24H0V0z"></path>
							<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
							<g transform="translate(7.75 17.5) scale(0.0075 -0.0075)">
								<path d="M832 877q0 152 -28 247.5t-77 147.5q-44 48 -89 66t-99 18q-123 0 -196 -88t-73 -255q0 -94 24 -155t78 -105q38 -31 86 -41.5t103 -10.5q64 0 138 22.5t129 59.5q1 15 2.5 39.5t1.5 54.5zM67 1005q0 115 37.5 210t102.5 164q62 66 151.5 103t181.5 37q103 0 186.5 -34.5 t144.5 -99.5q77 -82 119.5 -215t42.5 -336q0 -185 -41.5 -350.5t-122.5 -274.5q-86 -116 -206.5 -177t-297.5 -61q-40 0 -85 4.5t-84 16.5v191h10q25 -14 78 -27t108 -13q196 0 308 129t127 369q-80 -54 -152.5 -79t-157.5 -25q-83 0 -151 18t-137 70q-80 61 -121 154.5 t-41 225.5z"></path>
							</g>
						</svg>
					</ToolControl>
					<ToolControl
						isActive={props.tool === "corner"}
						onClick={() => props.changeTool("corner")}
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
							<path
								transform="translate(6.2 11.2) scale(0.0035 -0.0035)"
								d="M1179 0h-984v260h314v787h-314v243q69 0 137 9t109 29q48 24 74.5 64.5t30.5 100.5h326v-1233h307v-260z"
							></path>
							<path
								transform="translate(13.2 11.2) scale(0.0035 -0.0035)"
								d="M1245 0h-1094v243q139 110 249.5 208t194.5 186q109 115 158 202t49 179q0 104 -62 159.5t-173 55.5q-57 0 -107.5 -14t-102.5 -36q-51 -23 -87 -47l-54 -36h-29v325q63 30 197 61.5t258 31.5q265 0 401.5 -118t136.5 -332q0 -132 -62 -258.5t-206 -271.5 q-90 -89 -175 -158.5t-123 -98.5h631v-281z"
							></path>
							<path
								transform="translate(6.2 18) scale(0.0035 -0.0035)"
								d="M1208 451q0 -109 -40.5 -199t-118.5 -153q-79 -63 -185.5 -96.5t-259.5 -33.5q-174 0 -298.5 29t-202.5 65v323h36q82 -52 192.5 -90t201.5 -38q54 0 117.5 9.5t106.5 41.5q34 25 54.5 61.5t20.5 103.5q0 66 -29 101.5t-77 51.5q-48 17 -115 19t-118 2h-64v262h59 q68 0 125 6t97 24q40 19 62.5 53t22.5 92q0 45 -21 73.5t-52 44.5q-36 18 -84 24t-82 6q-55 0 -112 -13t-111 -33q-42 -16 -88 -41.5t-68 -38.5h-31v319q77 33 207.5 63.5t266.5 30.5q133 0 230.5 -23t166.5 -67q76 -47 114 -119.5t38 -163.5q0 -127 -73.5 -222.5 t-193.5 -123.5v-14q53 -8 103.5 -27t98.5 -62q45 -39 74.5 -100.5t29.5 -146.5z"
							></path>
						</svg>
					</ToolControl>
					<ToolControl
						isActive={props.tool === "center"}
						onClick={() => props.changeTool("center")}
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
							<path
								transform="translate(7.6, 14.5) scale(0.0035 -0.0035)"
								d="M1179 0h-984v260h314v787h-314v243q69 0 137 9t109 29q48 24 74.5 64.5t30.5 100.5h326v-1233h307v-260z"
							></path>
							<path
								transform="translate(11.6, 14.5) scale(0.0035 -0.0035)"
								d="M1245 0h-1094v243q139 110 249.5 208t194.5 186q109 115 158 202t49 179q0 104 -62 159.5t-173 55.5q-57 0 -107.5 -14t-102.5 -36q-51 -23 -87 -47l-54 -36h-29v325q63 30 197 61.5t258 31.5q265 0 401.5 -118t136.5 -332q0 -132 -62 -258.5t-206 -271.5 q-90 -89 -175 -158.5t-123 -98.5h631v-281z"
							></path>
						</svg>
					</ToolControl>
					<ToolControl
						isActive={props.tool === "color"}
						onClick={() => props.changeTool("color")}
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<g stroke="#0003" strokeWidth="0.3">
								<path
									fill="#e6e6e6"
									d="m12 12 3.36-7.2h3.84v3.84l-7.2 3.36"
								></path>
								<path fill="#b0b0b0" d="m12 12 7.2-3.36v5.29l-7.2-1.93"></path>
								<path
									fill="#505050"
									d="m12 12 7.2 1.93v5.27h-2.16l-5.04-7.2"
								></path>
								<path fill="#d1efa5" d="m12 12 5.04 7.2h-5.67l0.63-7.2"></path>
								<path fill="#f1b0f6" d="m12 12-0.63 7.2h-6.57l7.2-7.2"></path>
								<path fill="#f3b48f" d="m12 12-7.2 7.2v-6.57l7.2-0.63"></path>
								<path fill="#f39390" d="m12 12-7.2 0.63v-5.67l7.2 5.04"></path>
								<path
									fill="#fae799"
									d="m12 12-7.2-5.04v-2.16h5.27l1.93 7.2"
								></path>
								<path fill="#8ac1f9" d="m12 12-1.93-7.2h5.29l-3.36 7.2"></path>
							</g>
							<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
						</svg>
					</ToolControl>
				</div>
			</div>
			<div className="order-2 md:order-3 w-[calc(var(--controls-sm-height)*0.235)] h-full grid grid-cols-1 grid-rows-4 gap-[calc(var(--controls-sm-height)*0.02)] md:w-full md:h-[calc(var(--controls-lg-width)*0.235)] md:grid-cols-4 md:grid-rows-1 md:gap-[calc(var(--controls-lg-width)*0.025)]">
				<AuxControl onClick={props.undo}>
					<svg viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"
						></path>
					</svg>
				</AuxControl>
				<AuxControl onClick={props.redo}>
					<svg viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71l-1.89 1.9z"
						></path>
					</svg>
				</AuxControl>
				<AuxControl onClick={() => {}}>
					<svg viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"></path>
						<path
							fill="currentColor"
							d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"
						></path>
					</svg>
				</AuxControl>
				<ToolControl
					isActive={props.shiftLock}
					noDisable={true}
					onClick={props.toggleShiftLock}
				>
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8.5 8.5h-5.2v-4.2c0-.55.45-1 1-1h4.2v5.2zM3.3 9.3h5.2v5.2h-5.2v-5.2zM8.5 20.5h-4.2c-.55 0-1-.45-1-1v-4.2h5.2v5.2zM9.3 3.3h5.2v5.2h-5.2v-5.2zM9.3 9.3h5.2v5.2h-5.2v-5.2zM9.3 15.3h5.2v5.2h-5.2v-5.2zM20.5 8.5h-5.2v-5.2h4.2c.55 0 1 .45 1 1v4.2zM15.3 9.3h5.2v5.2h-5.2v-5.2zM19.5 20.5h-4.2v-5.2h5.2v4.2c0 .55-.45 1-1 1z"></path>
						<path
							transform="translate(2.9, 2.9) scale(0.0935)"
							fill="rgba(255, 215, 0, 0.5)"
							stroke="rgba(0, 126, 255, 1)"
							strokeWidth="15"
							strokeLinecap="butt"
							strokeLinejoin="round"
							d="M138 10L182 10L182 118L138 118 ZM10 74L54 74L54 118L10 118 ZM74 138L118 138L118 182L74 182 Z"
						></path>
					</svg>
				</ToolControl>
			</div>
		</div>
	);
	// return (
	// 	<div className="flex flex-row w-[min(50vh,85vw)] md:w-[min(25%,60vh)] md:flex-col">
	// 		<div className="flex order-3 h-full aspect-square ml-[min(2vw,1.5vh)] md:order-2 md:w-[min(100%,60vh)] md:ml-0 md:mt-[min(1.5vw,3vh)]">
	//
	// 		</div>
	// 		<div className="w-fit h-full flex-shrink-0 order-2 grid grid-cols-1 grid-rows-4 gap-[0.5vh] ml-[min(2vw,1.5vh)] md:order-3 md:w-[min(100%,60vh)] md:gap-[min(0.5vw,1vh)] md:grid-cols-4 md:grid-rows-1 md:ml-0 md:mt-[min(1.5vw,3vh)]">
	// 			<AuxControl></AuxControl>
	// 			<AuxControl></AuxControl>
	// 			<AuxControl></AuxControl>
	// 			<AuxControl></AuxControl>
	// 		</div>
	// 	</div>
	// );
}

export default Controls;
