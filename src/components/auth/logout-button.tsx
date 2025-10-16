import { authClient } from "~/lib/auth-client";

export const LogoutButton = () => {
	const logout = async (event: MouseEvent) => {
		event.preventDefault();
		try {
			await authClient.signOut();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<button class="btn" name="logout" type="button" onClick={logout}>
			Se déconnecter
		</button>
	);
};
