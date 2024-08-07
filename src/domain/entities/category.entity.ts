import { CreateCategoryRequestDTO } from "../../presentation/http/dtos/category/create-category-request.dto";

interface ICategoryInterface {
  name: string;
  userId: number;
  status?: boolean;
}

export class CategoryEntity {
  private _name: string;
  private _userId: number;
  private _status?: boolean;

  private constructor(props: ICategoryInterface) {
    this._name = props.name;
    this._status = props.status;
    this._userId = props.userId;
  }

  static create({ name, status, userId }: CreateCategoryRequestDTO) {
    // this.validate({ name, status, userId });

    return new CategoryEntity({ name, status, userId });
  }

  // private static validate(props: Record<string, unknown>) {
  //   if (props.status && typeof props.status !== "boolean") {
  //     throw new Error("Status not valid");
  //   }

  //   if (typeof props.userId !== "number") {
  //     throw new Error("userId not valid");
  //   }
  // }

  public get name(): string {
    return this._name;
  }

  public get status(): boolean | undefined {
    return this._status;
  }

  public get userId(): number {
    return this._userId;
  }
}
