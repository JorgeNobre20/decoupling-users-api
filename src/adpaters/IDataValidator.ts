export interface IDataValidator<DataType> {
  validate: (data: DataType) => Promise<void>;
}
