// export { auth as middleware } from '@/auth'

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const{ auth:middleware} = NextAuth(authConfig)