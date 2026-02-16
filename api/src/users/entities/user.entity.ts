import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Lang } from '../../lang/lang';
import { AuthStrategy } from 'src/auth/auth.provider';
import { Like } from 'src/likes/entities/like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';
import { Watched } from 'src/watched/entities/watched.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture_url: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'enum', enum: Lang, default: Lang.ENGLISH })
  language: Lang;

  @Column({ type: 'enum', enum: AuthStrategy, default: AuthStrategy.LOCAL })
  auth_strategy: AuthStrategy;

  @Column({ type: 'varchar', length: 6, nullable: true, default: null })
  otp_code?: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  otp_code_expiry?: Date;

  @Column({ type: 'boolean', default: true })
  show_name: boolean;

  @Column({ type: 'boolean', default: true })
  show_watch: boolean;

  @Column({ type: 'boolean', default: true })
  show_watchlist: boolean;

  @OneToMany(() => Like, (like) => like.user)
  likes: Relation<Like>[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment>[];

  @OneToMany(() => Watched, (watched) => watched.user)
  watched: Relation<Watched>[];
}
