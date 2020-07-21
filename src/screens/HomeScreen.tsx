import React, { Component } from "react";
import { View, Text } from "react-native";
import { IEmployee } from "../models/employee.model";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constraints/Colors";
import { Ionicons } from "@expo/vector-icons";

interface IHomeScreenState {
	employees: IEmployee[];
}

interface IHomeScreenProps {
	navigation: any;
}

export default class HomeScreen extends React.Component<
	IHomeScreenProps,
	IHomeScreenState
> {
	constructor(props: IHomeScreenProps) {
		super(props);

		this.state = {
			employees: [
				{
					id: 1,
					firstName: "Siraj",
					lastName: "Mohammad",
					designation: "Soft dev",
					department: {
						id: 1,
						name: "Development"
					}
				},
				{
					id: 2,
					firstName: "Osama",
					lastName: "Yousif",
					designation: "Soft dev",
					department: {
						id: 1,
						name: "IT"
					}
				}
			]
		};
	}

	render() {
		return (
			<FlatList
				data={this.state.employees}
				keyExtractor={(item, index) => `${item.id}_${index}`}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							key={`${item.id}_${index}`}
							onPress={() => {
								this.props.navigation.navigate("Addnew", item);
							}}
							style={{
								padding: 10,
								flexDirection: "row",
								justifyContent: "space-between",
								backgroundColor: Colors.white,
								borderBottomColor: Colors.lightGray,
								borderBottomWidth: 0.5
							}}>
							<View>
								<Text>{`${item.firstName} ${item.lastName}`}</Text>
							</View>

							<View>
								{item.department && (
									<Text>{`${item.department.name}`}</Text>
								)}
							</View>

							<View>
								<Ionicons name="ios-arrow-forward" size={24} />
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		);
	}
}
