import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from "@nestjs/mongoose";
import{UsersSchema}from "./user.model";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Users",
      schema: UsersSchema
   }]),
   JwtModule.register({
    secret: 'your-jwt-secret',  // Use environment variables for production
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
