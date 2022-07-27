interface ToolControlProps {
	isActive: boolean;
	noDisable?: boolean;
	children: React.ReactNode;
	label: string;
	onClick: () => void;
}

function ToolControl(props: ToolControlProps) {
	return (
		<button
			aria-label={props.label}
			title={props.isActive && !props.noDisable ? undefined : props.label}
			className={`h-full aspect-square flex-center ml-auto ${
				props.isActive
					? "text-white border-opacity-100 dark:bg-primary-700 dark:text-slate-200 dark:border-primary-400"
					: "text-primary-500 border-opacity-50 bg-opacity-0 hover:bg-opacity-20 dark:text-primary-400 dark:text-opacity-80 dark:border-primary-600 dark:border-opacity-80"
			} bg-primary-500 border border-primary-300 outline-none transition-colors rounded-md`}
			disabled={!props.noDisable && props.isActive}
			onClick={props.onClick}
		>
			<div className="aspect-square justify-items-center bg- flex justify-center w-3/4">
				{props.children}
			</div>
		</button>
	);
}

export default ToolControl;
