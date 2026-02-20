import { Lang } from "src/lang/lang";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { MediaFile } from "./media-file.entity";

@Entity()
export class Subtitlefile {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column('varchar', { length: 15 })
    imdbID: string;

    @Column({ type: 'enum', enum: Lang })
    language: Lang;

    @Column('varchar', { length: 4096 })
    path: string;

    @ManyToOne(() => MediaFile, (movie: MediaFile) => movie.subtitles)
    @JoinColumn({ name: 'imdbID' })
    movie: Relation<MediaFile>;
}