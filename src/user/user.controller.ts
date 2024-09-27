import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async signUp(
    @Body() createUserDto: CreateUser,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.signUp(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error registering user',
        error: error.message,
      });
    }
  }

  @Post('auth/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response
  ) {
    try {
      const { access_token } = await this.userService.login(loginDto);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        access_token,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Login failed',
        error: error.message,
      });
    }
  }
}
