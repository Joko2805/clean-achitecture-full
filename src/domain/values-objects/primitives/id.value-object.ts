type idProps = {
  value: number;
};

export class IdValueObject {
  private _value: number;
  private _key: string;

  constructor(props: object) {
    const key = Object.keys(props)[0];
    this._key = key;
    const value = Object.values(props)[0];

    this.validateId(value);

    this._value = value;
  }

  private validateId(value: number) {
    if (isNaN(value) || value <= 0) {
      throw new Error(`Invalid: "${this._key}"`);
    }
  }

  public get value(): number {
    return this._value;
  }
}
