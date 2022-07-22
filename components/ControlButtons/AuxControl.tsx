interface AuxControlProps {
	children: React.ReactNode;
	label: string;
	onClick: () => void;
}

function AuxControl(props: AuxControlProps) {
	return (
		<button
			aria-label={props.label}
			title={props.label}
			className="h-full border outline-none transition-colors bg-opacity-0 border-opacity-50 rounded-md aspect-square flex-center border-primary-300 bg-primary-500 text-primary-500 hover:bg-opacity-20"
			onClick={props.onClick}
		>
			<div className="w-2/3 h-2/3 flex-center">{props.children}</div>
		</button>
	);
}

export default AuxControl;
