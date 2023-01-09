import { HttpRoute } from "../../../http/models";

import { authenticationRoutes } from "./autentication";
import { userRoutes } from "./users";

export const routes: HttpRoute[] = [...authenticationRoutes, ...userRoutes];
