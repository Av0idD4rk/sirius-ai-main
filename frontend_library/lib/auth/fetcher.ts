import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "@/lib/auth/utils";

// Extract necessary functions from the AuthActions utility.
const { handleJWTRefresh, storeToken, getToken } = AuthActions();

export const api = async () => {
    // Получить токен, дождавшись его завершения
    const token = await getToken("access");

    return (
        wretch(process.env.BACKEND_IP_ADDRESS)
            // Initialize authentication with the access token.
            .auth(`Bearer ${token}`)
            // Catch 401 errors to refresh the token and retry the request.
            .catcher(401, async (error: WretchError, request: Wretch) => {
                try {
                    // Attempt to refresh the JWT token.
                    const { access } = (await handleJWTRefresh().json()) as {
                        access: string;
                    };

                    // Store the new access token.
                    await storeToken(access, "access");

                    // Replay the original request with the new access token.
                    return request
                        .auth(`Bearer ${access}`)
                        .fetch()
                        .unauthorized(() => {
                            window.location.replace("/login");
                        })
                        .json();
                } catch (err) {
                    window.location.replace("/login");
                }
            })
    );
};

export const fetcher = async (url: string): Promise<any> => {
    // Дождаться инициализации API с токеном и отправить запрос
    const client = await api();
    return client.get(url).json();
};
