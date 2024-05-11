import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    return await new this.transactionModel({
      ...createTransactionDto,
      createdAt: new Date(),
      userId,
    }).save();
  }

  async findAll(userId: string): Promise<Transaction[]> {
    return await this.transactionModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Transaction | null> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (transaction && transaction.userId !== String(userId)) {
      throw new UnauthorizedException();
    }
    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ): Promise<Transaction | null> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (transaction && transaction.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto)
      .exec();
  }

  async remove(id: string, userId: string): Promise<Transaction | null> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (transaction && transaction.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.transactionModel.findByIdAndDelete(id).exec();
  }
}
