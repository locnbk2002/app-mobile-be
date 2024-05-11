import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  logger: Logger;
  constructor(private readonly userService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post('')
  @ApiProperty()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const newUser = createUserDto;
    try {
      const query = { email: newUser.email };
      const isUser = await this.userService.findOne(query);
      if (isUser) throw new ConflictException('User Already Exist');
      const user = await this.userService.create(newUser);
      return user;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }
}
