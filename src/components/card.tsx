import type { JSX } from "solid-js";

export const Card = (props: { children: JSX.Element; class?: string }) => {
	return (
		<div class="card shadow-sm" classList={{ [props.class ?? ""]: !!props.class }}>
			{props.children}
		</div>
	);
};

export const CardBody = (props: { children: JSX.Element; class?: string }) => {
	return (
		<div class={"card-body"} classList={{ [props.class ?? ""]: !!props.class }}>
			{props.children}
		</div>
	);
};
