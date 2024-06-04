import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
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
