import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home/Home";
import Hello from "../components/Hello/Hello";
import BoxGroup from "../components/BoxGroup/BoxGroup";
import BoxGroup2 from "../components/BoxGroup2/BoxGroup2";
import FlexBox from "../components/FlexBox/FlexBox";
import Position from "../components/Position/Position";
import UseState from "../components/UseState/UseState";
import UseCallback from "../components/UseCallback/UseCallback";
import UseEffect from "../components/UseEffect/UseEffect";
import UseRef from "../components/UseRef/UseRef";
import UseMemo from "../components/UseMemo/UseMemo";
import Count from "../pages/Count/Count";
import Login from "../pages/Login/Login";
import { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Carousel from "../pages/Carousel/Carousel";
import FormElements from "../pages/FormElements/FormElements";

export type MainStackParamList = {
    Hello: { name: string; isError: boolean };
    Home: undefined;
    BoxGroup: undefined;
    BoxGroup2: undefined;
    FlexBox: undefined;
    Position: undefined;
    UseState: undefined;
    UseCallback: undefined;
    UseEffect: undefined;
    UseRef: undefined;
    UseMemo: undefined;
    Count: undefined;
    Login: undefined;
    StartupScreen: undefined;
    Carousel: undefined;
    FormElements: undefined;
}

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackScreen() {
    return (
        <MainStack.Navigator initialRouteName="Home">
            <MainStack.Group
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen name="Hello" component={Hello} />
                <MainStack.Screen name="Home" component={Home} />
                <MainStack.Screen name="BoxGroup" component={BoxGroup} />
                <MainStack.Screen name="BoxGroup2" component={BoxGroup2} />
                <MainStack.Screen name="FlexBox" component={FlexBox} />
                <MainStack.Screen name="Position" component={Position} />
                <MainStack.Screen name="UseState" component={UseState} />
                <MainStack.Screen name="UseCallback" component={UseCallback} />
                <MainStack.Screen name="UseEffect" component={UseEffect} />
                <MainStack.Screen name="UseRef" component={UseRef} />
                <MainStack.Screen name="UseMemo" component={UseMemo} />
                <MainStack.Screen name="Count" component={Count} />
                <MainStack.Screen name="FormElements" component={FormElements} />
                <MainStack.Screen name="Carousel" component={Carousel} />
                {/* <MainStack.Screen name="StartupScreen" component={() => <></>} /> Esse componente seria o responsavel por carregar o splash screen. */}
            </MainStack.Group>
        </MainStack.Navigator>
    );
}

const LoginStack = createStackNavigator<MainStackParamList>();

function LoginStackScreen() {
    return (
        <LoginStack.Navigator initialRouteName="Login">
            <LoginStack.Group
                screenOptions={{
                    headerShown: false,
                }}
            >
                <LoginStack.Screen name="Login" component={Login} />
            </LoginStack.Group>
        </LoginStack.Navigator>
    );
}

export default function AppRoutes() {

    const [isLoading, setIsLoading] = useState(true);

    const { auth: { isAuthenticated } } = useAppContext();

    useEffect(() => {
        if (isAuthenticated !== null) {
            setIsLoading(false);
        }
    }, [isAuthenticated]);


    return (

        isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00BC7D" />
            </View>
        ) :
            (
                <NavigationContainer>
                    {isAuthenticated ? <MainStackScreen /> : <LoginStackScreen />}
                </NavigationContainer>
            )
    );

}
