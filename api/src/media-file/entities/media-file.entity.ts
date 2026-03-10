import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { SubtitleFile } from "./subtitle-file.entity";
import { MediaFileStatus } from "../enum/media-file-status.enum";
import { Lang } from "src/lang/lang";

@Entity()
export class MediaFile {
    @PrimaryColumn('varchar', { length: 15, unique: true })
    imdbID: string;

    @CreateDateColumn()
    date: Date;

    @Column('varchar', { length: 4096 })
    path: string;

    @Column({ type: 'enum', enum: MediaFileStatus, default: MediaFileStatus.PENDING, nullable: true })
    status?: MediaFileStatus;

    @Column({ type: 'enum', enum: Lang })
    language: Lang;

    @Column({ type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    lastWatchedAt: Date;

    @OneToMany(() => SubtitleFile, (subtitles: SubtitleFile) => subtitles.movie)
    subtitles: Relation<SubtitleFile>[];
}