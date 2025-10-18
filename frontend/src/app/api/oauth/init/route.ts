import { whopApi } from "@/lib/whop-sdk";
import { servicesURL } from "@/utils";


export function GET(request: Request): Response {
  const requestUrl = new URL(request.url);
  const next: string = requestUrl.searchParams.get("next") ?? "/dashboard";

  const { url: authUrl, state }: { url: string; state: string } = whopApi.oauth.getAuthorizationUrl({
    // This has to be defined in the redirect uris outlined in step 1.2
    redirectUri: `${servicesURL.publicFrontend}/api/oauth/callback`,
    // These are the authorization scopes you want to request from the user.
    scope: ["read_user"],
  });

  // The state is used to restore the `next` parameter after the user lands on the callback route.
  // Note: This is not a secure way to store the state and for demonstration purposes only.
  const response = new Response(null, {
    status: 302,
    headers: {
      Location: authUrl,
      "Set-Cookie": `oauth-state.${state}=${encodeURIComponent(
        next
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });

  return response;
}