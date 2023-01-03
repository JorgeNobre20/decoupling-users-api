import { createServer } from "restify";
import "./config/env";
import { SERVER_CONFIG } from "./config/env";

import { routes } from "./infra/http/routes";
import {
  ExpressHttpServer,
  RestifyHttpServer,
  ServerStarter,
} from "./infra/http/server";

const PORT = SERVER_CONFIG.PORT;

const httpServer = new ExpressHttpServer(PORT, routes);
ServerStarter.run(httpServer);
