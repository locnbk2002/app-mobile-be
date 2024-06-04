import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNumber, IsDate, IsString } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsNumber()
  readonly amount: number;

  @IsString()
  currency: string;

  @IsString()
  type: string;

  @IsString()
  category: string;

  @IsString()
  note: string;

  @IsDate()
  readonly transactionDateTime: string;
}
