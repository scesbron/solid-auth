import { createMiddleware } from "@solidjs/start/middleware";
import { auth } from "~/lib/auth";

export default createMiddleware({
	onRequest: async (event) => {
		event.locals.session = await auth.api.getSession({
			headers: event.request.headers,
		});
	},
});
