import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from "path";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        retryAttempts: 10,
        type: "mysql",
        host: "localhost",
        port: 3306,
        database: "neststudy",
        username: "root",
        password: "1234",
        entities: [
          path.join(__dirname, "/entities/**/*.entity.{js, ts}"),
        ],
        synchronize: false,
        logging: true,
        timezone: "local",
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
