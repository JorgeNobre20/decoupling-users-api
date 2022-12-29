import { IUUIDGeneratorService } from "../../services";

export class UUIDInMemoryGeneratorService implements IUUIDGeneratorService {
  async generate() {
    return new Date().toISOString();
  }
}
