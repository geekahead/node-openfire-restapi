

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

    public paths(...paths: string[]): UriBuilder {
        paths.forEach((path, index, array: string[]) => {
            this.value = this.value.concat(this.value.length === 0 ? "":"/").concat(path);
        });
        
        return this;
    }

    public filters(...filters: {key: string, value: string}[]): UriBuilder {
        if (!filters || filters.length === 0) {
            return this;
        }
        this.value = this.value.concat("?");
        filters.forEach((filter, index, array: {key: string, value: any}[]) => {
            this.value = this.value.concat((index === 0) ? "": "&").concat(filter.key).concat("=").concat(filter.value);
        });

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

