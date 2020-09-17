import { IAuthorization } from "../../RestClient";


export class BasicAuthorization implements IAuthorization{
    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    public toString(): string {
        return "Basic " + Buffer.from(this.name + ":" + this.password, "utf-8").toString("base64");
    }
}