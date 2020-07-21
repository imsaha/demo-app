import { HttpService } from "./HttpService";
import { IIdName } from "../models/common.model";
import { IEmployee } from "../models/employee.model";

export default class ApiService {
	private readonly http: HttpService;
	constructor() {
		this.http = new HttpService();
	}

	public getDepartmentsAsync() {
		return this.http.getAsync<IIdName>("types/{lang}/departments");
	}

	public getEmployeesAsync() {
		return this.http.getAsync<IIdName>("employees/{lang}");
	}

	public getEmployeeByIdAsync(id: number) {
		return this.http.getAsync<IIdName>(`employees/{lang}${id}`);
	}

	public postEmployee(employee: IEmployee) {
		return this.http.postAsync<IIdName>(`employees/{lang}`, employee);
	}
}
