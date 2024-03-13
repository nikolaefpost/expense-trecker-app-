import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import {AllExpanses, ManageExpenses, RecentExpenses} from "./screens"
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons"
import {IconButton} from "./сomponents";
import ExpensesContextProvider from "./store/context/expenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator screenOptions={({navigation}) => ({
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: "white",
            tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({tintColor}) => (
                <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                        navigation.navigate("ManageExpense")
                    }}
                />)

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
export default function App() {
    return (
        <ExpensesContextProvider>
            <StatusBar style="light"/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                    headerTintColor: "white",

                }}>
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
                        presentation: "modal"
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ExpensesContextProvider>
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
