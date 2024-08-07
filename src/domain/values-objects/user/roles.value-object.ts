type RoleProps = {
  roleIds: number[];
};

export class RoleValueObject {
  private _roleIds: number[];

  constructor(props: RoleProps) {
    this.validate(props.roleIds);
    this._roleIds = props.roleIds;
  }

  private validate(roleIds: number[]): void {
    if (!Array.isArray(roleIds)) {
      throw new Error("Roles should be an array");
    }

    if (roleIds.length === 0) {
      throw new Error("Roles array should not be empty");
    }

    roleIds.forEach((roleId) => {
      if (typeof roleId !== "number" || roleId <= 0) {
        throw new Error(`Invalid role ID: ${roleId}`);
      }
    });
  }

  public get roleIds(): number[] {
    return this._roleIds;
  }
}
