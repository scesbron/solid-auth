import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, customSession, twoFactor } from "better-auth/plugins";
import { getRequestEvent } from "solid-js/web";
import { db } from "~/api/db";
import { users, account, session, verification } from '~/db/schema';

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "pg",
    schema: {
      user: users,
      account,
      session,
      verification,
      twoFactor,
    },
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		admin(),
		twoFactor(),
    customSession(async ({ user, session }) => {
      const role = "test"
      return { role, user, session };
    }),
	],
});

export const checkAuthenticated = () => {
	const event = getRequestEvent();
	const user = event?.locals.session?.user;
	if (!user) throw new Error("Not authenticated");
	return user;
};
