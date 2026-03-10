import { IsInt, IsString, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { TypeStrategy } from 'src/movies/movies.provider';
import { Watched } from '../entities/watched.entity';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class WatchedResponseDto {
    @Expose()
    movie_id: string;

    @Expose()
    movieType: TypeStrategy;

    @Expose()
    @Type(() => UserResponseDto)
    user: UserResponseDto;

    constructor(partial: Partial<Watched>) {
        Object.assign(this, partial);
    }
}
