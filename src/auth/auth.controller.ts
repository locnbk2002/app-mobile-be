import {
  Controller,
  Post,
  Logger,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginToken } from './dto/login-token.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiProperty()
  async login(@Body() loginDto: LoginDto): Promise<LoginToken> {
    try {
      return await this.authService.generateJwtToken(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('viewProfile')
  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  async viewProfile(@Request() req: any): Promise<GetUserDto> {
    const userInfo: GetUserDto = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      address: req.user.address,
    };
    return userInfo;
  }
}
