import { HttpRoute } from "../../../../http/models";
import { loginRoute } from "./login";

import { signUpRoute } from "./signUp";

export const authenticationRoutes: HttpRoute[] = [signUpRoute, loginRoute];
