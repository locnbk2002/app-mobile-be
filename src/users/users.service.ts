import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query).select('+password');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user.');

    const hashedPassword = await this.authService.getHashedPassword(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    this.logger.log('Updating User.');
    return this.userModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }

  async findOneAndDelete(query: any): Promise<any> {
    return this.userModel.findOneAndDelete(query);
  }
}
