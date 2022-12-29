import { HttpRoute } from "../../../../http/models";

import { signUpRoute } from "./signUp";

export const authenticationRoutes: HttpRoute[] = [signUpRoute];
