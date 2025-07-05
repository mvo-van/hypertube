import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {compareSync} from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (user && compareSync(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
