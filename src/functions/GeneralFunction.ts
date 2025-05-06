import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebaseConfig';

export const getUserById = async (uid: string) => {
  try {
    const userRef = doc(FIREBASE_DB, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('Пользователь не найден');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error;
  }
};
