export type InvalidFieldProps = {
  fieldName: string;
  receivedValue: string;
  errors: string[];
};

export class InvalidField {
  private fieldName: string;
  private receivedValue: string;
  private errors: string[];

  constructor(props: InvalidFieldProps) {
    this.fieldName = props.fieldName;
    this.receivedValue = props.receivedValue;
    this.errors = props.errors;
  }

  getFieldName() {
    return this.fieldName;
  }

  getReceivedValue() {
    return this.receivedValue;
  }

  getErrors() {
    return this.errors;
  }
}
