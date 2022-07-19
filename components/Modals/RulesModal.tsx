import Banner from "../Banner";
import ExitButton from "./ExitButton";

interface RulesModalProps {
	name: string;
	author: string;
	exit: () => void;
}

function RulesModal(props: RulesModalProps) {
	return (
		<>
			<Banner
				name={props.name}
				author={props.author}
				hideSmall={false}
				maxWidth="100%"
				height="12vh"
			></Banner>
			<div>Rules</div>
			<ExitButton label="Hide Rules" onClick={props.exit}></ExitButton>
		</>
	);
}

export default RulesModal;
