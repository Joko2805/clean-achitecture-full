import { ICreateProductDTO } from "../../app/dtos/product/create-product.dto";
import { StatusValueObject } from "../values-objects/primitives/status.value-object";
import { IdValueObject } from "../values-objects/primitives/id.value-object";
import { DescriptionValueObject } from "../values-objects/product/description.value-object";
import { NameValueObject } from "../values-objects/product/name.value-object";

// TODO: HERE
interface ProductInterface {
  name: NameValueObject;
  categoryId: IdValueObject;
  userId: IdValueObject;
  description?: DescriptionValueObject;
  status?: StatusValueObject;
}

export class ProductEntity {
  private _name: NameValueObject;
  private _categoryId: IdValueObject;
  private _userId: IdValueObject;
  private _description?: DescriptionValueObject;
  private _status?: StatusValueObject;

  private constructor(props: ProductInterface) {
    this._name = props.name;
    this._description = props.description;
    this._categoryId = props.categoryId;
    this._userId = props.userId;
    this._status = props.status;
  }

  static create({
    name,
    description,
    categoryId,
    userId,
    status,
  }: ICreateProductDTO) {
    const newName = new NameValueObject({ value: name });
    const newDescription = new DescriptionValueObject({ value: description });
    const newCategoryId = new IdValueObject({ value: categoryId });
    const newUserId = new IdValueObject({ userId });
    const newStatus = new StatusValueObject({ value: status });

    return new ProductEntity({
      name: newName,
      description: newDescription,
      categoryId: newCategoryId,
      userId: newUserId,
      status: newStatus,
    });
  }

  public get name(): NameValueObject {
    return this._name;
  }

  public get description(): DescriptionValueObject | undefined {
    return this._description;
  }

  public get categoryId(): IdValueObject {
    return this._categoryId;
  }

  public get userId(): IdValueObject {
    return this._userId;
  }

  public get status(): StatusValueObject | undefined {
    return this._status;
  }
}
