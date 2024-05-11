import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { LoginToken } from './dto/login-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const query = { email: email };
    const user = await this.usersService.findOne(query);
    if (!user) throw new NotFoundException('Email not exist');
    const isMatched = await this.comparePassword(password, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid password');
    return user;
  }

  async generateJwtToken(loginDto: LoginDto): Promise<LoginToken> {
    const payload = {
      email: loginDto.email,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatched) => {
        if (isMatched) return true;
        return false;
      })
      .catch((error) => error);
  }
}
