
import { contract } from "@fileown/shared";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { cookies } from 'next/headers'

// import { auth } from './auth';

console.log("cookies", cookies().get("authjs.session-token")?.value);

export const api = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_CLIENTSIDE_SERVER_URL!,
  baseHeaders: {
    Authorization: () => `Bearer ${cookies().get("authjs.session-token")?.value}`,
  }

});
