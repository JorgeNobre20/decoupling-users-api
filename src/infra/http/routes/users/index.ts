import { HttpRoute } from "../../../../http/models";

import { createUserRoute } from "./createUser";
import { deleteUserRoute } from "./deleteUser";
import { getUserRoute } from "./getUser";
import { updateUserRoute } from "./updateUser";

export const userRoutes: HttpRoute[] = [
  createUserRoute,
  getUserRoute,
  deleteUserRoute,
  updateUserRoute,
];
