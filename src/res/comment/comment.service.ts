import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/entities/comment.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) { }

    async createComment(userId: string, parentId: string, content: string, articleId: string) {
        const comment = await this.commentRepository.save({
            userId: userId,
            parentId: parentId,
            content: content,
            articleId: articleId,
        });

        return comment;
    }


    async modifyComment(userId: string, commentId: string, content: string) {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                userId: userId,
            }
        });

        if (!comment) {
            throw new UnauthorizedException("본인의 댓글이 아닙니다.");
        }

        const updateResult = await this.commentRepository.update(
            { id: commentId },
            { content: content },
        );

        return { affected: updateResult?.affected };

    }


    async removeComment(commentId: string, userId: string) {
        const deleteResult = await this.commentRepository.softDelete({
            id: commentId,
            userId: userId,
        });

        return { affected: deleteResult?.affected };
    }



}