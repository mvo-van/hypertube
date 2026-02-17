import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TypeStrategy } from "src/movies/movies.provider";

export class CreateLikeDto {
    @IsEnum(TypeStrategy)
    @IsNotEmpty()
    type: TypeStrategy;

    @IsString()
    @IsNotEmpty()
    movie_id: string;
}
