import { HttpRoute } from "../../../http/models";
import { userRoutes } from "./users";

export const routes: HttpRoute[] = [...userRoutes];
