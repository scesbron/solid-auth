import { A, useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Alert } from "~/components/alert";
import { Button } from "~/components/button";
import { Card, CardBody } from "~/components/card";
import { Input } from "~/components/input";
import { Title } from "~/components/title";
import { authClient, getAuthErrorMessage } from "~/lib/auth-client";

type FormFields = {
	password?: string;
	error?: string;
	isLoading: boolean;
	enabled: boolean;
	totpURI?: string;
	backupCodes?: string[];
};

export default function TwoFactorEnable() {
	const location = useLocation<{ redirectTo: string }>();
	const [values, setValues] = createStore<FormFields>({ isLoading: false, enabled: false });

	const onSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (values.password) {
			setValues({ error: undefined, isLoading: true });
			await authClient.twoFactor.enable(
				{ password: values.password },
				{
					onSuccess: (ctx) => {
						setValues({ isLoading: false, enabled: true, totpURI: ctx.data.totpURI, backupCodes: ctx.data.backupCodes });
					},
					onError: (ctx) => {
						setValues({ error: getAuthErrorMessage(ctx.error), isLoading: false });
					},
				},
			);
		}
	};

	return (
		<main class="flex justify-center items-center w-full pt-12">
			<Card class="w-lg">
				<CardBody>
					<Title class="text-center pb-4">Activation de la double authentification</Title>
					<form onSubmit={onSubmit}>
						<fieldset class="fieldset flex flex-col gap-3">
							<Show when={values.error}>
								<Alert variant="error">{values.error}</Alert>
							</Show>
							<Input
								label="Mot de passe"
								name="password"
								type="password"
								required
								value={values.password}
								onInput={(event) => setValues({ password: event.currentTarget.value })}
							/>
							<div class="flex justify-end">
								<A href="/forgot-password" class="link link-hover">
									Mot de passe oublié
								</A>
							</div>
							<Button variant="primary" type="submit" isLoading={values.isLoading}>
								Connexion
							</Button>
						</fieldset>
						<div>
							Si vous n'avez pas de compte{" "}
							<A href="/register" class="link link-primary">
								inscrivez-vous
							</A>
						</div>
					</form>
				</CardBody>
			</Card>
		</main>
	);
}
