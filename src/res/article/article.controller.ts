import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("article")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createArticle(@Body() body, @User() user) {
        const userId = user.id;
        const title = body.title;
        const content = body.content;
        const article = await this.articleService.createArticle(
            title,
            content,
            userId,
        );

        return article;
    }

    @Get("/:id")
    async readArticle(@Param("id") id) {
        const articleId = id;

        const article = await this.articleService.getArticle(articleId);

        return article;

    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateArticle(@Param("id") id, @User() user, @Body() body) {
        const userId = user.id;
        const articleId = id;
        const title = body.title;
        const content = body.content;

        const result = await this.articleService.modifyArticle(
            userId,
            articleId,
            title,
            content,
        )

        return result;
    }


}