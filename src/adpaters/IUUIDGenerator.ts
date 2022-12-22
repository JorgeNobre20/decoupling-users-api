export abstract class IUUIDGenerator {
  abstract generate(): Promise<string>;
}
