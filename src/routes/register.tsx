import { A, type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Alert } from "~/components/alert";
import { Button } from "~/components/button";
import { Card, CardBody } from "~/components/card";
import { Input } from "~/components/input";
import { authClient, getAuthErrorMessage } from "~/lib/auth-client";

type FormFields = {
	name: string;
	email: string;
	password: string;
	error?: string;
	isLoading: boolean;
};

export default function Register(props: RouteSectionProps) {
	const navigate = useNavigate();
	const [values, setValues] = createStore<FormFields>({
		name: "",
		email: "",
		password: "",
		isLoading: false,
	});

	const onSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		setValues({ error: undefined, isLoading: true });
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: (_data) => {
					navigate("/", { replace: true });
				},
				onError: (ctx) => {
					setValues({ error: getAuthErrorMessage(ctx.error), isLoading: false });
				},
			},
		);
	};

	return (
		<main class="flex justify-center items-center w-full pt-12">
			<Card class="w-lg">
				<CardBody>
					<h1 class="text-center text-xl font-bold pb-4">Création d'un compte</h1>
					<form onSubmit={onSubmit}>
						<fieldset class="fieldset flex flex-col gap-3">
							<Show when={values.error}>
								<Alert variant="error">{values.error}</Alert>
							</Show>
							<input type="hidden" name="redirectTo" value={props.params.redirectTo ?? "/"} />
							<Input
								label="Nom"
								name="name"
								value={values.name}
								onInput={(event) => setValues({ name: event.currentTarget.value })}
							/>
							<Input
								label="Email"
								name="email"
								value={values.email}
								onInput={(event) => setValues({ email: event.currentTarget.value })}
							/>
							<Input
								label="Mot de passe"
								name="password"
								type="password"
								value={values.password}
								onInput={(event) => setValues({ password: event.currentTarget.value })}
							/>
							<Button variant="primary" type="submit" isLoading={values.isLoading}>
								Créer le compte
							</Button>
							<div>
								Si vous avez un compte{" "}
								<A href="/login" class="link link-primary">
									connectez-vous
								</A>
							</div>
						</fieldset>
					</form>
				</CardBody>
			</Card>
		</main>
	);
}
