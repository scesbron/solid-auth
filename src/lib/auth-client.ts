import { customSessionClient, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/solid";
import type { auth } from "~/lib/auth";

export const authClient = createAuthClient({
	plugins: [twoFactorClient(), customSessionClient<typeof auth>()],
});

export const getAuthErrorMessage = (error: Record<string, any>): string => {
  return (
    error.message ||
    error.statusText ||
    String(error)
  );
};

