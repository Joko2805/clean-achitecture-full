type NameProps = {
  value: string;
};

export class NameValueObject {
  private _value: string;

  constructor(props: NameProps) {
    const { value } = props;

    this.validateName(value);

    this._value = value;
  }

  private validateName(value: string) {
    if (typeof value !== "string") {
      throw new Error("Name should be a string");
    }
  }

  public get value(): string {
    return this._value;
  }
}
