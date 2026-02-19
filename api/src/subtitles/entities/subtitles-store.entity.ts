import { Lang } from "src/lang/lang";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm";
import { MovieStore } from "../../downloader/entities/movie-store.entity";

@Entity()
export class SubtitleStore {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column('varchar', { length: 15 })
    imdbID: string;

    @Column({ type: 'enum', enum: Lang })
    language: Lang;

    @Column('varchar', { length: 4096 })
    path: string;

    @ManyToOne(() => MovieStore, (movie: MovieStore) => movie.subtitles)
    @JoinColumn({ name: 'imdbID' })
    movie: Relation<MovieStore>;
}