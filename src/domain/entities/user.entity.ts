import { IRegisterUserDTO } from "../../app/dtos/user/register-user.dto";
import { IUpdateUserDTO } from "../../app/dtos/user/update-user.dto";
import { EmailValueObject } from "../values-objects/user/email.value-object";
import { GenderValueObject } from "../values-objects/user/gender.value-object";
import { RoleValueObject } from "../values-objects/user/roles.value-object";

interface UserInteface {
  email: EmailValueObject;
  password: string;
  gender: GenderValueObject;
  roles: RoleValueObject;
  address?: string;
  img?: string;
}

export class UserEntity {
  private _email: EmailValueObject;
  private _password: string;
  private _gender: GenderValueObject;
  private _roles: RoleValueObject;
  private _address?: string;
  private _img?: string;

  private constructor(props: UserInteface) {
    this._email = props.email;
    this._password = props.password;
    this._gender = props.gender;
    this._address = props.address;
    this._img = props.img;
    this._roles = props.roles;
  }

  static create({ email, password, gender, roles, address }: IRegisterUserDTO) {
    const newEmail = new EmailValueObject({ address: email });
    const newGender = new GenderValueObject({ description: gender });
    const newRoles = new RoleValueObject({ roleIds: roles });

    return new UserEntity({
      email: newEmail,
      password,
      gender: newGender,
      roles: newRoles,
      address,
    });
  }

  static update(userData: IUpdateUserDTO) {
    if (userData.email) {
      userData.email = new EmailValueObject({
        address: userData.email,
      }).address;
    }

    if (userData.gender) {
      userData.gender = new GenderValueObject({
        description: userData.gender,
      }).description;
    }
    return userData;
  }

  // static update(userData: IUpdateUserRequestDTO) {
  //   if (userData.email) {
  //     userData.email = new EmailValueObject({
  //       address: userData.email,
  //     }).address;
  //   }

  //   return userData;
  // }

  public get email(): EmailValueObject {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get gender(): GenderValueObject {
    return this._gender;
  }

  public get address(): string | undefined {
    return this._address;
  }

  public get img(): string | undefined {
    return this._img;
  }

  public get roles(): RoleValueObject {
    return this._roles;
  }
}
