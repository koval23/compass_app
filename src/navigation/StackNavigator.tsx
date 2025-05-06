import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProviderHome from '../screens/ProviderHomeScreen';
import ClientHome from '../screens/ClientHomeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ProviderHome" component={ProviderHome} />
            <Stack.Screen name="ClientHome" component={ClientHome} />
        </Stack.Navigator>
    );
}
