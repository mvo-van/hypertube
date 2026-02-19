import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { SubtitleStore } from "../../subtitles/entities/subtitles-store.entity";

@Entity()
export class MovieStore {
    @PrimaryColumn('varchar', { length: 15, unique: true })
    imdbID: string;

    @Column('date')
    date: Date;

    @Column('varchar', { length: 4096 })
    path: string;

    @OneToMany(() => SubtitleStore, (subtitles: SubtitleStore) => subtitles.movie)
    subtitles: Relation<SubtitleStore>[];
}