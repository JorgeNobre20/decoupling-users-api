import { IUUIDGenerator } from "../../services";

export class UUIDInMemoryGenerator extends IUUIDGenerator {
  async generate() {
    return new Date().toISOString();
  }
}
