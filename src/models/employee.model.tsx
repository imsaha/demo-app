import { IIdName, IFile } from "./common.model";

export interface IEmployee {
	id: number;
	firstName: string;
	lastName: string;
	designation: string;
	department: IIdName;
	avatar?: IFile;
}
