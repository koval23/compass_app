import { UserRole } from "../const/GeneralConst";

export interface ClientProfile{
      uid: string;
      email: string;
      nickName?: string;
      role: UserRole;
      createdAt: Date;
      location?: string;
      photoUrl?: string;
}