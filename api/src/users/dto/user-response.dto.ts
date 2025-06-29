import {Lang} from "../../lang/lang";

export class UserResponseDto {
    pseudo: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
    language: Lang;
}