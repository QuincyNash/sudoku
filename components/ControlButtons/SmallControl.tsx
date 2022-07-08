interface SmallControlProps {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler;
}

function SmallControl(props: SmallControlProps) {
	return (
		<button
			className="w-[calc(var(--controls-sm-height)*0.18)] aspect-square flex justify-center items-center rounded-md border border-secondary-300 border-opacity-40 dark:border-opacity-60 text-secondary-300 text-opacity-70 dark:text-secondary-200 dark:text-opacity-70 bg-secondary-100 bg-opacity-0 transition-colors hover:bg-opacity-20 hover:bg-secondary-10 hover:text-opacity-100 md:w-[calc(var(--controls-lg-width)*0.18)]"
			onClick={props.onClick}
		>
			<div className="w-2/3 aspect-square flex justify-center items-center ">
				{props.children}
			</div>
		</button>
	);
}

export default SmallControl;
