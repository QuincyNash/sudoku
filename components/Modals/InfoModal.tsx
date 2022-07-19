import ExitButton from "./ExitButton";

interface InfoModalProps {
	exit: () => void;
}

function InfoModal(props: InfoModalProps) {
	return (
		<>
			<span>Made by 14-year-old developer: Quincy Nash</span>
			<ExitButton label="Hide Info" onClick={props.exit}></ExitButton>
		</>
	);
}

export default InfoModal;
