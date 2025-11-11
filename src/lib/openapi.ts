import createClient from "openapi-react-query";
import createFetchClient from "openapi-fetch";
import type { Middleware } from "openapi-fetch";
import type { paths } from "@/schema";
import { JWT_EXPIRATION_KEY, JWT_ACCESS_TOKEN_KEY } from "@/lib/consts";

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
    const expiration = localStorage.getItem(JWT_EXPIRATION_KEY);

    if (token && expiration && Date.now() <= parseInt(expiration, 10)) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  },
};

fetchClient.use(authMiddleware);

const client = createClient(fetchClient);

export const $api = {
  client: (args?: { token?: string }) => {
    if (args && args.token) {
      const immediateAuthMiddleware: Middleware = {
        onRequest({ request }) {
          request.headers.set("Authorization", `Bearer ${args.token}`);

          return request;
        },
      };

      fetchClient.use(immediateAuthMiddleware);
      return createClient(fetchClient);
    } else {
      return client;
    }
  },
};
