import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";


@Controller("comment")
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body() body, @User() user) {
        const content = body.content;
        const parentId = body?.parentId; //부모가 없으면 undefined 리턴
        const articleId = body.articleId;
        const userId = user.id;
        const comment = await this.commentService.createComment(
            userId,
            parentId,
            content,
            articleId,
        );

        return comment;
    }


    @UseGuards(JwtAuthGuard)
    @Put(":/id")
    async modifyComment(@Body() body, @User() user, @Param("id") id) {
        const content = body.content;
        const commentId = id;
        const userId = user.id;
        const result = await this.commentService.modifyComment(
            userId,
            commentId,
            content,
        );

        return result;

    }


}