import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { TypeStrategy } from 'src/movies/movies.provider';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { SelfUserResponseDto } from 'src/users/dto/self-user-response.dto';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  content: string;

  @Column({ type: 'timestamp', nullable: false })
  published_date: Date;



  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;


  @Column()
  user_id: number;

  @Column({ type: 'enum', enum: TypeStrategy, nullable: false })
  movieType: TypeStrategy;

  @Column({ type: 'varchar', nullable: false })
  movie_id: string;

}
