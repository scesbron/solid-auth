import { A, Navigate } from "@solidjs/router";
import { createEffect, Match, Switch } from "solid-js";
import { LogoutButton } from "~/components/auth/logout-button";
import { authClient } from "~/lib/auth-client";

export default function Home() {
  const session = authClient.useSession();

  createEffect(() => {
    console.log('session', JSON.stringify(session()))
  })
  return (
    <Switch fallback="Checking auth...">
      <Match when={!session().isPending && !session().data}>
        <Navigate href="/login" />
      </Match>
      <Match when={!session().isPending && session().data}>
        <main class="w-full p-4 space-y-2">
          <h2 class="font-bold text-xl">Bonjour {session().data?.user?.name}</h2>
          <div class="flex gap-2 items-center py-4">
            <div>2FA : {session().data?.user?.twoFactorEnabled ? "Oui" : "Non"}</div>{" "}
            <A class="btn" href="/two-factor-enable">
              Activation de la double authentification
            </A>
          </div>
          <LogoutButton />
        </main>
      </Match>
    </Switch>
  );
}
