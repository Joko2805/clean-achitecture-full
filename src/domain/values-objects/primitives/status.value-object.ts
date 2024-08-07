type statusProps = {
  value?: boolean;
};

export class StatusValueObject {
  private _value?: boolean;

  constructor(props: statusProps) {
    const { value } = props;

    if (value !== undefined) {
      this.validateStatus(value);
    }

    this._value = value;
  }

  private validateStatus(value: boolean) {
    if (typeof value !== "boolean") {
      throw new Error("Status should be a boolean");
    }
  }

  public get value(): boolean | undefined {
    return this._value;
  }
}
