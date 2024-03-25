import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("main")
    async getMainPage() {
        return this.userService.getMainPage();
    }

    @Post("register")
    async register(@Body() body) {
        const email = body?.email;
        const password = body?.password;

        return this.userService.register(email, password);
    }

    @UseGuards(JwtAuthGuard)
    @Get("user-info")
    async getUserInfo(@Req() req) {

        return `you're email is ${req.user.email}!`;
    }

}