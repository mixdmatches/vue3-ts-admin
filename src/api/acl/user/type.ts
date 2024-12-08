export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
  data: object;
  total: number;
}

export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: null;
  roleName?: string;
}

export type Records = User[];

export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

//一个职位的ts类型
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
}

//获取全部职位的列表
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: RoleData[];
    allRolesList: RoleData[];
  };
}

// 用户分配职位接口ts类型
export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}
