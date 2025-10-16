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
  email?: string;
  error?: string;
  isLoading: boolean;
};

export default function Login() {
  const location = useLocation<{ redirectTo: string }>();
  const [values, setValues] = createStore<FormFields>({ isLoading: false });

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (values.email && values.password) {
      setValues({ error: undefined, isLoading: true });
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: location.state?.redirectTo ?? "/",
        },
        {
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
          <Title class="text-center pb-4">Connexion</Title>
          <form onSubmit={onSubmit}>
            <fieldset class="fieldset flex flex-col gap-3">
              <Show when={values.error}>
                <Alert variant="error">{values.error}</Alert>
              </Show>
              <Input
                label="Email"
                name="email"
                type="email"
                required
                autocomplete="email"
                value={values.email}
                onInput={(event) => setValues({ email: event.currentTarget.value })}
              />
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
