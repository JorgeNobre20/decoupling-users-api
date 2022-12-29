import { HttpRoute } from "../../../http/models";
import { authenticationRoutes } from "./authentication";
import { userRoutes } from "./users";

export const routes: HttpRoute[] = [...authenticationRoutes, ...userRoutes];
