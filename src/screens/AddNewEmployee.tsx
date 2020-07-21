import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { IEmployee } from "../models/employee.model";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import {
	Form,
	Item,
	Input,
	Label,
	Icon,
	Picker,
	Container,
	Content,
	Left,
	Right,
	Button
} from "native-base";
import Colors from "../constraints/Colors";
import { IIdName } from "../models/common.model";

interface IAddNewEmployeeScreenState {
	employee: IEmployee;
	departments: IIdName[];
}

export default class AddNewEmployeeScreen extends React.Component<
	any,
	IAddNewEmployeeScreenState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			employee: props.route?.params ?? {
				firstName: "",
				lastName: "",
				designation: ""
			},
			departments: []
		};
	}

	componentDidMount() {
		const { employee } = this.state;
		if (employee) {
			this.props.navigation.setOptions({
				title: `${employee.firstName} ${employee.lastName}`,
				headerRight: null
			});
		}

		this.props.navigation.setOptions({
			headerRight: null
		});
	}

	handleFirstNameChange = evt => {
		const { employee } = this.state;
		employee.firstName = evt.nativeEvent.text;
		this.setState({
			employee
		});
	};

	handleLastNameChange = evt => {
		const { employee } = this.state;
		employee.lastName = evt.nativeEvent.text;
		this.setState({
			employee
		});
	};

	handleDesignationNameChange = evt => {
		const { employee } = this.state;
		employee.designation = evt.nativeEvent.text;
		this.setState({
			employee
		});
	};

	handleSave = () => {
		console.log(this.state.employee);
	};

	render() {
		const { employee, departments } = this.state;
		return (
			<Container>
				<Content
					style={{
						padding: 10
					}}>
					<Form>
						<Item floatingLabel>
							<Label>{"First name"}</Label>
							<Input
								value={employee?.firstName}
								onChange={this.handleFirstNameChange}
							/>
						</Item>

						<Item floatingLabel>
							<Label>Last name</Label>
							<Input
								value={employee?.lastName}
								onChange={this.handleLastNameChange}
							/>
						</Item>

						<Item floatingLabel>
							<Label>Designation</Label>
							<Input
								value={employee?.designation}
								onChange={this.handleDesignationNameChange}
							/>
						</Item>

						<Item
							picker
							style={{
								paddingLeft: 15,
								marginTop: 30
							}}>
							<Left>
								<Label
									style={{
										color: Colors.gray
									}}>
									Department
								</Label>
							</Left>
							<Right>
								{departments && departments.length > 0 && (
									<Picker
										selectedValue={employee.department?.id}
										mode="dropdown"
										placeholder="Select department"
										iosIcon={<Icon name="arrow-down" />}
										style={{ width: null }}>
										{departments.map(department => {
											return (
												<Picker.Item
													label={department.name}
													value={department.id}
												/>
											);
										})}
									</Picker>
								)}
							</Right>
						</Item>

						<View
							style={{
								marginTop: 30
							}}>
							<Button block success onPress={this.handleSave}>
								<Text>Save</Text>
							</Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	formGroup: {
		marginBottom: 5,
		padding: 10
	},
	label: {
		fontWeight: "700"
	},
	input: {
		borderBottomWidth: 0.6,
		fontSize: 16,
		padding: 10,
		paddingLeft: 0,
		paddingRight: 0
	}
});
