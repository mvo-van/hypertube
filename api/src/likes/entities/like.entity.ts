import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { TypeStrategy } from "src/movies/movies.provider";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: Relation<User>;

    @Column({ type: 'varchar', length: 20, nullable: false })
    movie_id: string;

    @Column({ type: 'enum', enum: TypeStrategy, nullable: false })
    type: TypeStrategy;
}
