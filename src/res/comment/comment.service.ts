import { Injectable } from "@nestjs/common";
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


}