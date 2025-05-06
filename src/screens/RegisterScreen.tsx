// app/RegisterScreen.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { FIREBASE_DB } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';



export default function RegisterScreen() {
    const [role, setRole] = useState('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);

            const userDoc = doc(FIREBASE_DB, 'users', response.user.uid);
            await setDoc(userDoc, {
                email: email,
                role: role,
                createdAt: new Date()
            });

            alert('Пользователь создан. Проверьте почту.');
            navigation.navigate('Login'); // переход назад
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ top: -100 }}>
                <Ionicons name="arrow-back" size={24} color="#FFD700" />
            </TouchableOpacity>

            <Text style={styles.title}>Регистрация</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Пароль"
                placeholderTextColor="#888"
                secureTextEntry={true}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
                dropdownIconColor="#FFD700"
                itemStyle={{ color: '#fff' }}
            >
                <Picker.Item label="Клиент" value="client" />
                <Picker.Item label="Исполнитель" value="provider" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 32,
        color: '#FFD700',
        marginBottom: 32,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    picker: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#0e0e0e',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
