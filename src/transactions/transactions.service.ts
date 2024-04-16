import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  // constructor(
  //   @InjectRepository(Transaction)
  //   private transacitonRepository: Repository<Transaction>,
  // ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return createTransactionDto;
    // return this.transacitonRepository.save(createTransactionDto);
  }

  findAll(): Transaction {
    return {
      id: 1,
      userId: 1,
      amount: 500000,
      transactionDateTime: '2024-04-16',
    };
    // return this.transacitonRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return { id, ...updateTransactionDto };
    // return this.transacitonRepository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
