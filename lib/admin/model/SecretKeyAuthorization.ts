import { IAuthorization } from "../../RestClient";

export class SecretKeyAuthorization implements IAuthorization {
    secretkey: string;

    constructor(secretKey: string) {
        this.secretkey = secretKey;
    }

    public toString(): string {
        return this.secretkey;
    }
}