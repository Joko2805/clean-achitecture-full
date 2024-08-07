type DescriptionProps = {
  value?: string;
};

export class DescriptionValueObject {
  private _value?: string;

  constructor(props: DescriptionProps) {
    const { value } = props;

    this.validateDescription(value);

    this._value = value;
  }

  private validateDescription(value?: string) {
    if (value !== undefined && value.length > 100) {
      throw new Error("Invalid Description");
    }
  }

  public get value(): string | undefined {
    return this._value;
  }
}
