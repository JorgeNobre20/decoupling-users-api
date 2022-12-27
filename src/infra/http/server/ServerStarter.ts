import { HttpServer } from "../../../http/server";

export class ServerStarter {
  static run(httpServer: HttpServer) {
    httpServer.run();
  }
}
