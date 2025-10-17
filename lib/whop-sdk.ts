import { WhopServerSdk, makeUserTokenVerifier } from "@whop/api";


export const whopApi = WhopServerSdk({
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,

  appApiKey: process.env.NEXT_PUBLIC_WHOP_API_KEY!,

  companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID,
});