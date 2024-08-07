type EmailProps = {
  address: string;
};

export class EmailValueObject {
  private _address: string;

  constructor(props: EmailProps) {
    this.validate(props.address);
    this._address = props.address;
  }

  private validate(address: string) {
    const REGEX =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!REGEX.test(address)) {
      throw new Error("Email not valid");
    }
  }

  public get address(): string {
    return this._address;
  }
}
