import { User } from "../types";


export class UserEntity {
    private constructor(readonly props: User) {}

    public static create(email: string,name: string,password: string) {
        // const {email,id,name,password} = data
        return new UserEntity({
            email,
            name,
            password,
        })
    }

    public static with(
        name: string,
        email: string,
        password: string,
    ) {
        return new UserEntity({
            email,
            name,
            password,
        });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get password() {
        return this.props.password;
    }
}
