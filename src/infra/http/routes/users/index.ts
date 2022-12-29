import { HttpRoute } from "../../../../http/models";

import { deleteUserRoute } from "./deleteUser";
import { getUserRoute } from "./getUser";
import { updateUserRoute } from "./updateUser";

export const userRoutes: HttpRoute[] = [
  getUserRoute,
  deleteUserRoute,
  updateUserRoute,
];
