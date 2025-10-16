import type { JSX } from "solid-js";

type TitleProps = {
	children: JSX.Element;
	class?: string;
};

export const Title = (props: TitleProps) => {
	return (
		<h1 class="text-2xl font-bold" classList={{ [props.class ?? ""]: !!props.class }}>
			{props.children}
		</h1>
	);
};
