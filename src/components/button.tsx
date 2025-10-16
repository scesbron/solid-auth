import { type Component, type ComponentProps, Show, splitProps } from "solid-js";

type Variant = "default" | "primary" | "secondary" | "accent" | "neutral" | "error" | "ghost";
type Size = "xs" | "sm" | "md" | "lg";

type ButtonProps = ComponentProps<"button"> & {
	variant?: Variant;
	size?: Size;
	isLoading?: boolean;
	isSquare?: boolean;
	isActive?: boolean;
};

const VARIANTS: Record<Variant, string> = {
	default: "",
	primary: "btn-primary",
	secondary: "btn-secondary",
	accent: "btn-accent",
	ghost: "btn-ghost",
	neutral: "btn-neutral",
	error: "btn-error",
};

const SIZES: Record<Size, string> = {
	xs: "btn-xs",
	sm: "btn-sm",
	md: "",
	lg: "btn-lg",
};

const LOADER_SIZES: Record<Size, string> = {
	xs: "size-3",
	sm: "size-4",
	md: "size-6",
	lg: "size-8",
};

export const Button: Component<ButtonProps> = (props) => {
	const [localProps, buttonProps] = splitProps(props, [
		"size",
		"variant",
		"isLoading",
		"class",
		"children",
		"isSquare",
		"isActive",
	]);

	return (
		<button
			class={`btn ${localProps.isSquare ? "btn-square" : ""} ${localProps.isActive ? "btn-active" : ""}
        ${SIZES[localProps.size ?? "md"]}
        ${VARIANTS[localProps.variant ?? "default"]}`}
			classList={{ [localProps.class ?? ""]: !!localProps.class }}
			{...buttonProps}
		>
			<Show when={localProps.isLoading}>
				<span class={`loading loading-spinner ${LOADER_SIZES[localProps.size ?? "md"]}`} />
			</Show>
			<Show when={!localProps.isLoading}>{localProps.children}</Show>
		</button>
	);
};
