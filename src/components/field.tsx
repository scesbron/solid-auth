import { type JSX, Show } from "solid-js";

export type FieldProps = {
	label: string;
	helper?: string;
	error?: string;
	required?: boolean;
	children: JSX.Element;
	class?: string;
};

export const Field = (props: FieldProps) => {
	return (
		<fieldset class="fieldset" classList={{ [props.class ?? ""]: !!props.class }}>
			<legend class="fieldset-legend">
				{props.label}
				<Show when={props.required}>
					<span class="text-error"> *</span>
				</Show>
			</legend>
			{props.children}
			<Show when={!props.error && !!props.helper}>
				<p class="opacity-60">{props.helper}</p>
			</Show>
			<Show when={!!props.error}>
				<p class="text-error">{props.error}</p>
			</Show>
		</fieldset>
	);
};
