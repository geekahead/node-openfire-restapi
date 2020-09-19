

export class UriBuilder {

    private value: string;

    private constructor(value: string) {
        this.value = value;
    }    

    public static instance(value: string = ""): UriBuilder {
        return new UriBuilder(value);
    }

    public concat(fragement: string): UriBuilder {
        this.value = this.value.concat(fragement);
        return this;
    }

    public separator(separator: string = ""): UriBuilder {
        this.value = this.value.concat(separator);
        return this;
    }

    public slash(): UriBuilder {
        this.value = this.value.concat("/");
        return this;
    }

    public getValue(): string {
        return this.value;
    }

    public uri(): string {
        return this.getValue();
    }

    public toString(): string {
        return this.getValue();
    }
}

