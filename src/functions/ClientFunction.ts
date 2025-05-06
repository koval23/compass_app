import { USER_ROLES, UserRole } from '../const/GeneralConst';
import { ClientProfile } from '../types/Client';

export const createClient = (
    uid: string,
    email: string,
  ): ClientProfile => {
    return {
      uid,
      email,
      role: USER_ROLES.CLIENT,
      nickName: '',
      createdAt: new Date(),
      location: '',
      photoUrl: ''
    };
  };
  