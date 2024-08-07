interface Props {
  userId: number;
  name: string;
  status?: boolean;
}

export class CreateCategoryRequestDTO {
  private _userId: number;
  private _name: string;
  private _status?: boolean;

  private constructor({ userId, name, status }: Props) {
    this._userId = userId;
    this._name = name;
    this._status = status;
  }

  static create(body: unknown): {
    isValid: boolean;
    instance?: CreateCategoryRequestDTO;
  } {
    const { userId, name, status } = body as {
      userId: number;
      name: unknown;
      status?: unknown;
    };

    if (
      !this.isValidName(name) ||
      !this.isValidStatus(status) ||
      !this.isValidUserId(userId)
    ) {
      return { isValid: false };
    }

    return {
      isValid: true,
      instance: new CreateCategoryRequestDTO({
        userId,
        name: name as string,
        status: status as boolean,
      }),
    };
  }

  private static isValidName(name: unknown): name is string {
    return typeof name === "string";
  }

  private static isValidStatus(status: unknown): status is boolean | undefined {
    return status === undefined || typeof status === "boolean";
  }

  private static isValidUserId(userId: number) {
    return !isNaN(userId);
  }

  get name(): string {
    return this._name;
  }

  get status(): boolean | undefined {
    return this._status;
  }

  get userId(): number {
    return this._userId;
  }
}
