import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { getUserById } from '../functions/GeneralFunction';
import { USER_ROLES } from '../const/GeneralConst';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH, email, password);

            console.log(response);
            if (response?.user) {
                const userId = response.user.uid
                const userById = await getUserById(userId);
                console.log(userById);
                // if (userById && userById.newClient.role === USER_ROLES.CLIENT) {
                if (USER_ROLES.CLIENT === userById?.role) {
                    navigation.navigate('ClientHome');
                }else if(USER_ROLES.PROVIDER === userById?.role ){
                    navigation.navigate('ProviderHome');
                }
            } else {
                alert('Что-то пошло не так...');
            }

        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Войти</Text>
            <KeyboardAvoidingView>
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

                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Вход</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Нет аккаунта? Зарегистрироваться</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

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
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#0e0e0e',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerText: {
        color: '#FFD700',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
