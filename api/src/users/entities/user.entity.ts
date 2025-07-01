import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Lang } from '../../lang/lang';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  pseudo: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  profile_picture_url: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'enum', enum: Lang, default: Lang.ENGLISH })
  language: Lang;
}
