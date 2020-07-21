import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import DemoApp from "./src/DempApp";
import { View, Text } from "react-native";

interface IAppState {
	isReady: boolean;
}

export default class App extends React.Component<any, IAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			isReady: false
		};
	}

	async componentDidMount() {
		try {
			await Font.loadAsync({
				Roboto: require("native-base/Fonts/Roboto.ttf"),
				Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
				...Ionicons.font
			});
			this.setState({
				isReady: true
			});
		} catch (error) {
			console.warn(error);
		}
	}

	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		}

		return <DemoApp />;
	}
}
