import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  create(createUserDto: CreateUserDto) {
    return createUserDto;
    // return this.usersRepository.save(createUserDto);
  }

  findAll(): User {
    return {
      id: 1,
      firstName: 'Loc',
      lastName: 'Bui',
      email: 'loc.builocnbk2002@hcmut.edu.vn',
      address: 'TP HCM',
    };
    // return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { id, ...updateUserDto };
    // return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
