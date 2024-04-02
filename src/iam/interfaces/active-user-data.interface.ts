import { Role } from 'src/user/enums/role.enum';

export interface ActiveUserData {
  sub: number;
  fullName: string;
  email: string;
  role: Role;
}
