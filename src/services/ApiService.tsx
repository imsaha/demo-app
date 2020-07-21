import { HttpService } from "./HttpService";
import { IIdName } from "../models/common.model";
import { IEmployee } from "../models/employee.model";

export default class ApiService {
	private readonly http: HttpService;
	constructor() {
		this.http = new HttpService();
	}

	public getDepartmentsAsync() {
		return this.http.getAsync<IIdName[]>("types/{lang}/department");
	}

	public getEmployeesAsync() {
		return this.http.getAsync<IEmployee[]>("employees/{lang}");
	}

	public getEmployeeByIdAsync(id: number) {
		return this.http.getAsync<IEmployee>(`employees/{lang}${id}`);
	}

	public postEmployeeAsync(employee: IEmployee) {
		return this.http.postAsync<number>(`employees/{lang}`, employee);
	}

	public deleteEmployeeByIdAsync(id: number) {
		return this.http.deleteAsync<boolean>(`employees/{lang}.${id}`);
	}
}
