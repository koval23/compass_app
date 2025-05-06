// app/RegisterScreen.tsx
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebaseConfig';
import { USER_ROLES, UserRole } from '../const/GeneralConst';
import { createProvider } from '../functions/ProviderFunctions';
import { createClient } from '../functions/ClientFunction';




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
            const userDoc = doc(FIREBASE_DB, 'users', response.user.uid);
            const userId = response.user.uid;
            
            if(role === USER_ROLES.CLIENT){
                // const newClient = createClient(userId, email);
                await setDoc(userDoc, createClient(userId, email));
            }else if(role === USER_ROLES.PROVIDER){
                // const newProvider = createProvider(userId, email);
                await setDoc(userDoc, createProvider(userId, email));
            }

            navigation.navigate('Login');
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
