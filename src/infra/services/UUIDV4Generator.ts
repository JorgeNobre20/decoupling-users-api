import { v4 as generateUuidV4 } from "uuid";

import { IUUIDGeneratorService } from "../../services";

export class UUIDV4GeneratorService implements IUUIDGeneratorService {
  async generate() {
    return generateUuidV4();
  }
}
