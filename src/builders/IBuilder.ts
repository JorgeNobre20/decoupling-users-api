export interface IBuilder<BuilderOutputType> {
  build: () => BuilderOutputType;
}
