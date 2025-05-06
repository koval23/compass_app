import { USER_ROLES, UserRole } from '../const/GeneralConst';
import { ProviderProfile } from '../types/Provider';

export const createProvider = (
    uid: string,
    email: string,
  ): ProviderProfile => {
    return {
      uid,
      email,
      role: USER_ROLES.PROVIDER,
      createdAt: new Date(),
      isVerified: false,
      profileCompleted: false,
      phoneNumber: '',
      photoUrl: '',
      location: '',
      languages: [],
      body: {
        age: 0,
        gender: '',
        height: 0,
        weight: 0,
        size: '',
        rating: 0,
        services: [],
        description: ''
      }
    };
  };