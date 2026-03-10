import { IsInt, IsString, MaxLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TypeStrategy } from 'src/movies/movies.provider';

export class CreateWatchedDto {
    @IsString()
    @IsNotEmpty()
    movie_id: string;

    @IsEnum(TypeStrategy)
    @IsNotEmpty()
    movieType: TypeStrategy;

    @IsInt()
    @IsOptional()
    time?: number = +0;
}
