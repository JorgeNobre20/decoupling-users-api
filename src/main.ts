import "./config/env";
import { SERVER_CONFIG } from "./config/env";
import { HttpServerProps } from "./http/server";

import { routes } from "./infra/http/routes";
import { ExpressHttpServer, ServerStarter } from "./infra/http/server";

const PORT = SERVER_CONFIG.PORT;

const serverProps: HttpServerProps = {
  port: PORT,
  routes
};

const httpServer = new ExpressHttpServer(serverProps);
ServerStarter.run(httpServer);
