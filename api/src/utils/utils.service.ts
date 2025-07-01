import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {genSalt, hash} from "bcryptjs";

@Injectable()
export class UtilsService {
    constructor(private config: ConfigService) {}

    async hashPassword(password: string): Promise<string> {
        const rounds = this.config.get<number>("BCRYPT_SALT_ROUNDS");
        const salt = await genSalt(rounds);

        return hash(password, salt);
    }
}
