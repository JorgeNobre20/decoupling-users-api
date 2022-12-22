import { IUUIDGenerator } from "./IUUIDGenerator";

export class UUIDInMemoryGenerator extends IUUIDGenerator {
  async generate() {
    return new Date().toISOString();
  }
}
