interface SmallControlProps {
	children: React.ReactNode;
	label: string;
	onClick?: React.MouseEventHandler;
}

function SmallControl(props: SmallControlProps) {
	return (
		<button
			aria-label={props.label}
			className="h-full aspect-square flex-center rounded-md border border-secondary-300 border-opacity-40 dark:border-opacity-60 outline-none text-secondary-300 text-opacity-70 dark:text-secondary-200 dark:text-opacity-70 bg-secondary-100 bg-opacity-0 transition-colors hover:bg-opacity-20 hover:bg-secondary-10 hover:text-opacity-100 md:w-full"
			onClick={props.onClick}
		>
			<div className="w-2/3 aspect-square flex-center">{props.children}</div>
		</button>
	);
}

export default SmallControl;
