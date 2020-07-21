import React, { Component } from "react";
import { View, Text, RefreshControl } from "react-native";
import { IEmployee } from "../models/employee.model";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constraints/Colors";
import { Ionicons } from "@expo/vector-icons";
import ApiService from "../services/ApiService";

interface IHomeScreenState {
	employees: IEmployee[];
	refreshing: boolean;
}

interface IHomeScreenProps {
	navigation: any;
}

export default class HomeScreen extends React.Component<
	IHomeScreenProps,
	IHomeScreenState
> {
	private readonly api: ApiService;
	constructor(props: IHomeScreenProps) {
		super(props);

		this.api = new ApiService();
		this.state = {
			employees: [],
			refreshing: false
		};
	}

	async componentDidMount() {
		await this.loadDataAsync();
	}

	async loadDataAsync() {
		this.setState({ refreshing: true });
		try {
			const employees = await this.api.getEmployeesAsync();
			this.setState({
				employees: employees
			});
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({ refreshing: false });
		}
	}

	render() {
		const { employees } = this.state;

		if (employees?.length > 0) {
			return (
				<FlatList
					data={this.state.employees}
					keyExtractor={(item, index) => `${item.id}_${index}`}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={async () => {
								await this.loadDataAsync();
							}}
						/>
					}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								key={`${item.id}_${index}`}
								onPress={() => {
									this.props.navigation.navigate(
										"Addnew",
										item
									);
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
									<Ionicons
										name="ios-arrow-forward"
										size={24}
									/>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			);
		} else {
			return (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate("Addnew", {
								onGoBack: async () => await this.loadDataAsync()
							})
						}
						style={{
							paddingHorizontal: 30,
							paddingVertical: 10,
							backgroundColor: Colors.primaryColor,
							minWidth: 130,
							borderRadius: 4
						}}>
						<Text>Add new</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}
