import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RSSNews extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    pubDate: string;

    @Column({ type: 'text' })
    resume: string;

    @Column({ nullable: true })
    creator: string;

    @Column()
    source: string;

}