import { HttpRoute } from "../../../../http/models";
import { createUserRoute } from "./createUser";
import { getUserRoute } from "./getUser";

export const userRoutes: HttpRoute[] = [createUserRoute, getUserRoute];
