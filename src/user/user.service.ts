import { Injectable ,NotFoundException,UnauthorizedException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUsers } from "./user.model";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUser } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class UserService {
    constructor(@InjectModel('Users') private readonly userModel: Model<IUsers>,
private jwtService: JwtService) {}

async signUp(createUser: CreateUser): Promise<IUsers> {
    const { password } = createUser;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({ ...createUser, password: hashedPassword });
    return newUser.save();
  }
async validateUser(email: string, password: string): Promise<IUsers | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
          }
          return null;
        }
async login(loginDto: LoginDto): Promise<{ access_token: string }> {
            const user = await this.validateUser(loginDto.email, loginDto.password);
            if (!user) {
              throw new Error('Invalid credentials');
            }
            
            const payload = { email: user.email, sub: user._id };
            return {
              access_token: this.jwtService.sign(payload),
            };
          }
async findById(userId: string): Promise<IUsers | null> {
  return this.userModel.findById(userId).exec();
          }
}