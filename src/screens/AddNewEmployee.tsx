import React, { Component } from "react";
import {
	View,
	Text,
	KeyboardAvoidingView,
	StyleSheet,
	FlatList,
	Alert,
	ActivityIndicator
} from "react-native";
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
import ApiService from "../services/ApiService";

interface IAddNewEmployeeScreenState {
	employee: IEmployee;
	departments: IIdName[];
	saving?: boolean;
	deleting?: boolean;
}

export default class AddNewEmployeeScreen extends React.Component<
	any,
	IAddNewEmployeeScreenState
> {
	private readonly api: ApiService;
	constructor(props: any) {
		super(props);

		this.api = new ApiService();
		this.state = {
			employee: props.route?.params ?? {
				firstName: "",
				lastName: "",
				designation: "",
				department: {
					id: 0,
					name: ""
				}
			},
			departments: []
		};
	}

	async componentDidMount() {
		const { employee } = this.state;
		if (employee) {
			const fullName = `${employee.firstName} ${employee.lastName}`;
			this.props.navigation.setOptions({
				title: fullName && fullName.length > 1 ? fullName : "Add new"
			});
		}

		this.props.navigation.setOptions({
			headerRight: null
		});

		const departments = await this.api.getDepartmentsAsync();
		this.setState({
			departments,
			employee
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

	handleDepartmentValueChange = (value: number) => {
		const { employee } = this.state;
		employee.department.id = value;
		this.setState({ employee });
	};

	handleSaveAsync = async () => {
		const { employee, saving: isSaving } = this.state;
		this.setState({ saving: true });
		try {
			if (
				employee.firstName &&
				employee.lastName &&
				employee.department.id > 0
			) {
				const response = await this.api.postEmployeeAsync(employee);
				if (response > 0) {
					employee.id = response;
					this.setState({ employee });
					this.props.navigation.goBack();
				} else {
					console.warn(response);
					Alert.alert("Error", "Opps, something went wrong!");
				}
			} else {
				Alert.alert("Missing data!", "All fields are required.");
			}
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({ saving: false });
		}
	};

	handleDeleteAsync = async () => {
		this.setState({ deleting: true });
		const { employee } = this.state;
		try {
			const result = Alert.alert(
				"Confirm",
				"Are you sure, you want to delete?",
				[
					{
						text: "Cancel"
					},
					{
						text: "Delete",
						onPress: async () => {
							try {
								const response = await this.api.deleteEmployeeByIdAsync(
									employee.id
								);
								if (response) {
									this.setState({
										employee: {
											id: 0,
											firstName: "",
											lastName: "",
											designation: "",
											department: {
												id: 0,
												name: ""
											}
										}
									});
								} else {
									Alert.alert(
										"Oops!",
										"Something went wrong."
									);
								}
							} catch (error) {
								Alert.alert(error.message);
							}
						},
						style: "destructive"
					}
				]
			);
		} catch (error) {
			Alert.alert(JSON.stringify(error));
		} finally {
			this.setState({ deleting: false });
		}
	};

	render() {
		const { employee, departments, saving, deleting } = this.state;
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
								<View>
									{departments && departments.length > 0 && (
										<Picker
											selectedValue={
												employee.department?.id
											}
											onValueChange={
												this.handleDepartmentValueChange
											}
											mode="dialog"
											placeholder="Select department"
											iosIcon={<Icon name="arrow-down" />}
											style={{ width: null }}>
											{departments.map(department => {
												return (
													<Picker.Item
														key={department.id}
														label={department.name}
														value={department.id}
													/>
												);
											})}
										</Picker>
									)}
								</View>
							</Right>
						</Item>

						<View
							style={{
								marginTop: 30
							}}>
							<Button
								disabled={saving}
								block
								success
								onPress={this.handleSaveAsync}>
								{saving && (
									<ActivityIndicator color={Colors.white} />
								)}
								<Text
									style={{
										padding: 10,
										color: saving
											? Colors.gray
											: Colors.black
									}}>
									Save
								</Text>
							</Button>

							{employee.id > 0 && (
								<Button
									style={{
										marginTop: 10
									}}
									disabled={deleting}
									block
									danger
									onPress={this.handleDeleteAsync}>
									{deleting && (
										<ActivityIndicator
											color={Colors.white}
										/>
									)}
									<Text
										style={{
											padding: 10,
											color: deleting
												? Colors.gray
												: Colors.black
										}}>
										Delete
									</Text>
								</Button>
							)}
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
