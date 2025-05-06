// export type UserRole = 'client' | 'provider';
  export const USER_ROLES = {
    CLIENT: 'client',
    PROVIDER: 'provider',
  } as const;
  
  export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
  
