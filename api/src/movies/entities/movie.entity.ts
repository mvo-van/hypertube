import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  year: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  released: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  runtime: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  genre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  director: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  writer: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  actors: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  plot: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  language: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  poster: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  metascore: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  local_path: string;

  @Column({ type: 'int', default: 0 })
  views: number;
}
