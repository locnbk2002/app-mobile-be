import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNumber, IsDate } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsNumber()
  readonly amount: number;

  @IsDate()
  readonly transactionDateTime: string;
}
