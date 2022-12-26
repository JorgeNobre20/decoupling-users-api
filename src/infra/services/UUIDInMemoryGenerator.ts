import { IUUIDGeneratorService } from "../../services";

export class UUIDInMemoryGeneratorService extends IUUIDGeneratorService {
  async generate() {
    return new Date().toISOString();
  }
}
