import { IsDate, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly amount: number;

  @IsDate()
  readonly transactionDateTime: string;
}
