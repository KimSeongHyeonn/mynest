import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CommonBigPKEntity } from "./common/common.entity";
import { UserEntity } from "./user.entity";
import { CommentEntity } from "./comment.entity";

@Entity("Article")
export class ArticleEntity extends CommonBigPKEntity {
    @Column("varchar", { unique: false, nullable: false })
    title: string;

    @Column("text", { unique: false, nullable: false })
    content: string;

    @Column("bigint", { unique: false, nullable: false })
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.articles)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.article)
    comments: CommentEntity[]
}