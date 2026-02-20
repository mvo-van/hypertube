import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { Subtitlefile } from "./subtitle-file.entity";

@Entity()
export class MediaFile {
    @PrimaryColumn('varchar', { length: 15, unique: true })
    imdbID: string;

    @CreateDateColumn()
    date: Date;

    @Column('varchar', { length: 4096 })
    path: string;

    @Column('boolean', { default: false })
    completed: boolean = false;

    @OneToMany(() => Subtitlefile, (subtitles: Subtitlefile) => subtitles.movie)
    subtitles: Relation<Subtitlefile>[];
}