import "./config/env";
import { ENVIRONMENT_CONFIG } from "./config/env";

import { routes } from "./infra/http/routes";
import { ExpressHttpServer, ServerStarter } from "./infra/http/server";

const PORT = ENVIRONMENT_CONFIG.SERVER_PORT;

const httpServer = new ExpressHttpServer(PORT, routes);
ServerStarter.run(httpServer);
