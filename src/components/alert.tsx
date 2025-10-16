import type { JSX } from "solid-js";

type Variant = "success" | "info" | "warning" | "error";

type AlertProps = {
	children: JSX.Element;
	class?: string;
	variant: Variant;
};

const VARIANTS: Record<Variant, string> = {
	success: "alert-success",
	info: "alert-info",
	warning: "alert-warning",
	error: "alert-error",
};

export const Alert = (props: AlertProps) => {
	return (
		<div
			role="alert"
			class={`alert ${VARIANTS[props.variant ?? "info"]}`}
			classList={{ [props.class ?? ""]: !!props.class }}
		>
			<span>{props.children}</span>
		</div>
	);
};
