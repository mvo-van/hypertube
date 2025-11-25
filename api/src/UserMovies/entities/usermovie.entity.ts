import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class UserMovie {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: false })
  movie_id: number;

  @ManyToMany(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column({ type: 'smallint', nullable: false })
  watch_offset: number;

  @Column({ type: 'timestamp', nullable: false })
  watch_date: Date;

  @Column({ type: 'boolean', nullable: false })
  finished: boolean;
}
