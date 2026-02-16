import { TypeStrategy } from "src/movies/movies.provider";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Watched {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (user) => user.watched)
    user: Relation<User>;

    @Column({ type: 'enum', enum: TypeStrategy, nullable: false })
    movieType: TypeStrategy;

    @Column({ type: 'varchar', nullable: false })
    movie_id: string;

    @Column({ type: 'int', default: 0 })
    time: number;

    @Column({ type: 'boolean', default: false })
    is_watched: boolean;
}
