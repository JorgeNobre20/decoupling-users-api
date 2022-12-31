import { HttpRoute } from "../../../../http/models";
import { loginRoute } from "./login";
import { signUpRoute } from "./signUp";

const authenticationRoutes: HttpRoute[] = [signUpRoute, loginRoute];
export { authenticationRoutes };
