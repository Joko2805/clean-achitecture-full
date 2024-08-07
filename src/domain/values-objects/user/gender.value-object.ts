enum Gender {
  MALE,
  FEMALE,
}

type GenderProps = {
  description: string;
};

export class GenderValueObject {
  private _description: string;
  constructor(props: GenderProps) {
    this.validate(props.description);
    this._description = props.description;
  }

  private validate(description: string) {
    if (!(description.toUpperCase() in Gender)) {
      throw new Error("Gender not valid");
    }
  }

  public get description(): string {
    return this._description;
  }
}
