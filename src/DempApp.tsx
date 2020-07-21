import React, { Component } from "react";
import SplashScreen from "./SplashScreen";
import { StatusBar } from "expo-status-bar";
import { Platform, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import Colors from "./constraints/Colors";
import { Ionicons } from "@expo/vector-icons";
import AddNewEmployeeScreen from "./screens/AddNewEmployee";
import MainStackNavigator from "./screens/MainStackNavigator";
const Stack = createStackNavigator();

interface IDemoAppState {
	isReady: boolean;
	appName: string;
}

export default class DemoApp extends React.Component<any, IDemoAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			isReady: false,
			appName: "Demo app"
		};
	}

	async componentDidMount() {
		try {
			// load app name from api backend and set
			this.setState({
				isReady: true,
				appName: "Demo app from API"
			});
		} catch (error) {
			console.warn(error);
		}
	}

	render() {
		if (!this.state.isReady) {
			return <SplashScreen />;
		}
		return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={({ navigation, route }) => ({
						headerShown: true,
						headerStyle: {
							backgroundColor: Colors.primaryColor
						},
						headerTintColor: Colors.black,
						headerTitleAlign: "left",
						headerTitleStyle: {
							fontSize: 16
						},
						headerRight: () => (
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Addnew");
								}}
								style={{ padding: 10 }}>
								<Ionicons name="md-person-add" size={24} />
							</TouchableOpacity>
						),
						headerBackTitleVisible: false
					})}
					initialRouteName="Home">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen
						name="Addnew"
						component={AddNewEmployeeScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
