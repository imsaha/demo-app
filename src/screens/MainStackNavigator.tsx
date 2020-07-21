import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import AddNewEmployeeScreen from "./AddNewEmployee";

const Stack = createStackNavigator();

export default function MainStackNavigator({ navigation, route }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
				headerBackTitleVisible: false,
				headerBackImage: () => {
					return (
						<Ionicons
							name="md-arrow-back"
							size={30}
							style={{ padding: 20 }}
						/>
					);
				}
			}}
			initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Addnew" component={AddNewEmployeeScreen} />
		</Stack.Navigator>
	);
}
