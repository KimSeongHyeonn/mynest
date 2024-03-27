import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("article")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createArticle(@Body() body, @User() user) {
        const userId = user.id;
        const title = body.title;
        const content = body.content;
        this.articleService.createArticle(
            title,
            content,
            userId,
        );
    }
}