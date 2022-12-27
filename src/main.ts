import { routes } from "./infra/http/routes";
import { ExpressHttpServer, ServerStarter } from "./infra/http/server";

const PORT = 3333;

const httpServer = new ExpressHttpServer(PORT, routes);
ServerStarter.run(httpServer);
