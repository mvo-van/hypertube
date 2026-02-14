import { Exclude, Expose } from "class-transformer";
import { Like } from "../entities/like.entity";
import { TypeStrategy } from "src/movies/movies.provider";
@Exclude()
export class LikeResponseDto {
    @Expose()
    type: TypeStrategy;

    @Expose()
    movie_id: string;

    @Expose()
    id: number;

    constructor(partial: Partial<Like>) {
        Object.assign(this, partial);
    }
}
