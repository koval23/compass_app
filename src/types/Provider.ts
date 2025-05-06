export type UserRole = 'client' | 'provider';
export type Gender = 'male' | 'female' | 'other';
export type Size = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXL';

export type ProviderBody = {
  age: number;
  gender: Gender; 
  height?: number;            // Рост (в см)
  weight?: number;            // Вес (в кг)
  size?: Size;              // Размер одежды или обуви (можно уточнить)          
  rating?: number;           // Рейтинг от клиентов (опционально)
  services: string[];        // Например: ['Массаж', 'Косметология']
  description: string;       // Краткое описание / био
}; 

export interface ProviderProfile {
  uid: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  location: string; 
  lastName?: string;
  photoUrl?: string;
  isVerified: boolean;
  phoneNumber?: string;
  languages?: string[];
  profileCompleted: boolean;
}
