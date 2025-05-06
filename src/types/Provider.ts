import { UserRole } from "../const/GeneralConst";

export type Gender = '' |'male' | 'female' | 'other';
export type Size = '' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXL';

export interface ProviderBody {
  age?: number;
  gender?: Gender; 
  height?: number;           // Рост (в см)
  weight?: number;           // Вес (в кг)
  size?: Size;               // Размер одежды или обуви (можно уточнить)          
  rating?: number;           // Рейтинг от клиентов (опционально)
  services: string[];        // Например: ['Массаж', 'Косметология']
  description: string;       // Краткое описание / био
}; 

export interface ProviderProfile {
  uid: string;
  email: string;
  nickName?: string;
  role: UserRole;
  createdAt: Date;
  body?: ProviderBody;
  location?: string; 
  photoUrl?: string;
  isVerified: boolean;
  phoneNumber?: string;
  languages?: string[];
  profileCompleted: boolean;
};