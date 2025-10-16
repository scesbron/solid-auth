import { type Component, type ComponentProps, createMemo, splitProps } from "solid-js";
import { Field } from "~/components/field";

type InputProps = ComponentProps<"input"> & {
	label: string;
	helper?: string;
	error?: string;
};

export const Input: Component<InputProps> = (props) => {
	const [localProps, inputProps] = splitProps(props, ["label", "helper", "error", "class"]);

	return (
		<Field
			label={localProps.label}
			helper={localProps.helper}
			error={localProps.error}
			required={inputProps.required}
			class={localProps.class}
		>
			<input class="input w-full" classList={{ "input-error": !!localProps.error }} {...inputProps} />
		</Field>
	);
};
