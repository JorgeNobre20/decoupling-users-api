export abstract class IUUIDGeneratorService {
  abstract generate(): Promise<string>;
}
