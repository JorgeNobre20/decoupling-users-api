import { HttpRoute } from "../../../../http/models";
import { createUserRoute } from "./createUser";

export const userRoutes: HttpRoute[] = [createUserRoute];
