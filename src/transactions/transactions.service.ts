import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaciton.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly trasactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await new this.trasactionModel({
      ...createTransactionDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll(): Promise<Transaction[]> {
    return await this.trasactionModel.find().exec();
  }

  async findOne(id: string): Promise<Transaction | null> {
    return await this.trasactionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | null> {
    return await this.trasactionModel
      .findByIdAndUpdate(id, updateTransactionDto)
      .exec();
  }

  async remove(id: string): Promise<Transaction | null> {
    return await this.trasactionModel.findByIdAndDelete(id).exec();
  }
}
