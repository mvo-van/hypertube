import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Lang } from '../../lang/lang';
import { AuthStrategy } from 'src/auth/auth.provider';

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

  @Column({ type: 'varchar', length: 255, nullable: false })
  profile_picture_url: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'enum', enum: Lang, default: Lang.ENGLISH })
  language: Lang;

  @Column({ type: 'enum', enum: AuthStrategy, default: AuthStrategy.LOCAL })
  auth_strategy: AuthStrategy;
}
