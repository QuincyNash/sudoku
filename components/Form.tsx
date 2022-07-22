import { validate } from "email-validator";
import Link from "next/link";
import { useState } from "react";

type Char = "letter" | "number" | "special";

interface Rule {
	required: Char;
	count: number;
}

interface Field {
	id: string;
	name?: string;
	type: string;
	autoComplete: string;
	placeholder: string;
	minLength?: number;
	maxLength?: number;
	match?: string;
	allowed?: string;
	rules: Rule[];
}

interface FormProps {
	fields: Field[];
	error: null | string;
	disabled: boolean;
	onSubmit: React.FormEventHandler;
	submitText: string;
	footerText: string;
	footerLinkText: string;
	footerLink: string;
	children: React.ReactNode;
}

function getError(
	text: string,
	name: string,
	type: string,
	rules: Rule[],
	allowed?: string,
	minLength?: number,
	match?: string
) {
	if (allowed !== undefined) {
		let badChars = [];
		for (let char of new Set(text)) {
			if (!allowed.includes(char)) {
				badChars.push(char);
			}
		}
		if (badChars.length > 0) {
			return `${name} cannot contain the character${
				badChars.length > 1 ? "s" : ""
			} '${badChars.join("")}'`;
		}
	}
	if (minLength !== undefined) {
		if (text.length < minLength) {
			if (text.length === 0) {
				return `${name} is required`;
			}
			return `${name} must be at least ${minLength} characters`;
		}
	}
	for (let rule of rules) {
		if (
			rule.required === "letter" &&
			text.replace(/[^A-Za-z]/g, "").length < rule.count
		) {
			return `${name} must contain at least ${rule.count} letter${
				rule.count > 1 ? "s" : ""
			}`;
		} else if (
			rule.required === "number" &&
			text.replace(/[^0-9]/g, "").length < rule.count
		) {
			return `${name} must contain at least ${rule.count} number${
				rule.count > 1 ? "s" : ""
			}`;
		} else if (
			rule.required === "special" &&
			text.replace(/[^@$!%*#?&]/g, "").length < rule.count
		) {
			return `${name} must contain at least ${rule.count} special character${
				rule.count > 1 ? "s" : ""
			}`;
		}
	}
	if (type === "email") {
		if (!validate(text)) {
			return `This is not a valid email address`;
		}
	}
	if (match) {
		let elem = document.querySelector(match) as HTMLInputElement;
		if (text !== elem.value) {
			return "Passwords don't match";
		}
	}
	return "";
}

function Error(props: { error: string | null; hidden: boolean }) {
	if (props.error !== null && !props.hidden) {
		return (
			<div className="box-content p-3 bg-red-200 border border-red-400 rounded-md h-fit min-h-6">
				<span className="text-red-900">{props.error}</span>
			</div>
		);
	} else {
		return null;
	}
}

function InputError(props: { error: string }) {
	if (props.error) {
		return (
			<div className="flex items-center w-full mt-1 ml-2 h-fit min-h-6 text-form-red">
				<svg className="flex-shrink-0 w-6 h-6" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
					/>
					<path fill="none" d="M0 0h24v24H0V0z" />
				</svg>
				<span className="ml-2 text-sm">{props.error}</span>
			</div>
		);
	} else {
		return null;
	}
}

export default function Form(props: FormProps) {
	const [hideError, setHideError] = useState(false);
	const [errors, setErrors] = useState(
		Array.from({ length: props.fields.length }).map(() => "")
	);
	const [showPasswords, setShowPasswords] = useState(
		Array.from({ length: props.fields.length }).map(() => false)
	);

	return (
		<form
			className="flex flex-col w-full h-full gap-4"
			onSubmit={(e) => {
				let flag = false;
				let newErrors = [...errors];

				for (let [i, field] of props.fields.entries()) {
					let elem = document.querySelector(`#${field.id}`) as HTMLInputElement;
					let error = getError(
						elem.value,
						field.name || field.placeholder,
						field.type,
						field.rules,
						field.allowed,
						field.minLength,
						field.match
					);

					if (error) {
						newErrors[i] = error;
						flag = true;
					}
				}
				if (flag) {
					e.preventDefault();
					setErrors(newErrors);
				} else {
					props.onSubmit(e);
					setHideError(false);
				}
			}}
		>
			<Error hidden={hideError} error={props.error}></Error>

			{props.fields.map((field, i) => {
				return (
					<div
						key={i}
						className="relative w-full p-2 rounded-lg border border-gray-100 bg-[#f8f9fd] h-fit"
					>
						<input
							id={field.id}
							className={`w-full h-12 p-3 pr-10 border border-[rgba(0,0,0,0.1)] transition-colors placeholder:text-[#6c757d] rounded-md outline-none ${
								errors[i] === ""
									? "focus-visible:border-blue-400"
									: "focus-visible:border-form-red"
							}`}
							disabled={props.disabled}
							type={
								field.type === "password"
									? showPasswords[i]
										? "text"
										: "password"
									: field.type
							}
							autoComplete={field.autoComplete}
							placeholder={field.placeholder}
							minLength={field.minLength}
							maxLength={field.maxLength}
							onInput={() => {
								let newErrors = [...errors];
								let elem = document.querySelector(
									`#${field.id}`
								) as HTMLInputElement;

								newErrors[i] = getError(
									elem.value,
									field.name || field.placeholder,
									field.type,
									field.rules,
									field.allowed,
									field.minLength,
									field.match
								);
								setErrors(newErrors);
								setHideError(true);
							}}
						></input>
						{field.type === "password" ? (
							<button
								type="button"
								tabIndex={-1}
								aria-label={
									showPasswords[i] ? "Hide Password" : "Show password"
								}
								title={showPasswords[i] ? "Hide Password" : "Show password"}
								className="absolute w-8 h-8 p-1 text-gray-400 transition-colors -translate-y-1/2 rounded-full hover:text-gray-600 hover:bg-gray-200 top-8 right-3"
								onClick={() => {
									let newShowPasswords = [...showPasswords];
									newShowPasswords[i] = !newShowPasswords[i];
									setShowPasswords(newShowPasswords);
								}}
							>
								<svg viewBox="0 0 48 48">
									<path
										fill="currentColor"
										d={
											showPasswords[i]
												? "m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z"
												: "M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z"
										}
									/>
								</svg>
							</button>
						) : (
							""
						)}
						<InputError error={errors[i]}></InputError>
					</div>
				);
			})}

			<button
				type="submit"
				className="w-full h-12 p-3 border border-[rgba(0,0,0,0.1)] transition-colors rounded-md text-white bg-[#2073c7] hover-focus:bg-[#0b5baa] hover-focus:border-blue-300 hover-focus:shadow-md"
				disabled={props.disabled}
			>
				{props.submitText}
			</button>

			{props.children}

			<p className="mt-1 text-center">
				{props.footerText}
				<Link href={props.footerLink}>
					<a
						tabIndex={props.disabled ? -1 : undefined}
						className="p-1 ml-1 text-blue-600 underline border border-transparent rounded-md outline-none focus-visible:border-blue-400 hover:text-purple-700 focus:text-purple-700"
					>
						{props.footerLinkText}
					</a>
				</Link>
			</p>
		</form>
	);
}
