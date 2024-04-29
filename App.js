import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {AllExpanses, LoginScreen, ManageExpenses, RecentExpenses, SignupScreen} from "./screens"
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons"
import {IconButton} from "./сomponents";
import ExpensesContextProvider from "./store/context/expenses";
import AuthContextProvider, {useAuthCtx} from "./store/context/auth";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.auth_primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: GlobalStyles.colors.auth_primary100},
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
            />
        </Stack.Navigator>
    );
}

const HeaderIcons = ({ tintColor}) => {
    const {logout } = useAuthCtx();
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => {
                    navigation.navigate("ManageExpense");
                }}
            />
            <IconButton
                icon="log-out-outline" // Log out icon
                size={24}
                color={tintColor}
                onPress={logout} // Trigger the logout function
            />
        </View>
    );
};


const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator
            screenOptions={({navigation}) => ({
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: "white",
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({tintColor}) => (
                    <HeaderIcons tintColor={tintColor} />)

            })}>
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="hourglass"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <BottomTabs.Screen
                name="AllExpanses"
                component={AllExpanses} options={{
                title: "All Expanses",
                tabBarLabel: "All Expanses",
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                        name="calendar"
                        size={size}
                        color={color}
                    />
                )
            }}/>
        </BottomTabs.Navigator>
    )
}

const AuthenticatedStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: "white",

        }}>
            <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpenses}
                options={{
                    presentation: "modal"
                }}/>
        </Stack.Navigator>
    )
}

const Navigation = () => {
    const {isAuthenticated} = useAuthCtx();
    return (
            <ExpensesContextProvider>
                <NavigationContainer>
                    {isAuthenticated ? <AuthenticatedStack/> : <AuthStack/>}
                </NavigationContainer>
            </ExpensesContextProvider>
    )

}

const Root = () => {
    const { authenticate } = useAuthCtx();

    useEffect(() => {
        const handleSplashScreen = async () => {
            try {
                // Prevent auto-hiding of the splash screen
                await SplashScreen.preventAutoHideAsync();

                const storageToken = await AsyncStorage.getItem('token');
                if (storageToken !== null) {
                    authenticate(storageToken);
                }

                // Splash screen can be hidden after initialization
                await SplashScreen.hideAsync();
            } catch (e) {
                console.error("Error handling splash screen:", e);
                await SplashScreen.hideAsync();
            }
        };

        handleSplashScreen();
    }, []);

    return  <Navigation />;
};

export default function App() {
    return (
        <AuthContextProvider>
            <StatusBar style="light"/>
            <Root/>
        </AuthContextProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
