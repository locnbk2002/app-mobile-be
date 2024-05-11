import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop()
  @ApiProperty({ required: true })
  userId: string;

  @Prop()
  @ApiProperty()
  amount: number;

  @Prop()
  @ApiProperty()
  currency: string;

  @Prop()
  @ApiProperty()
  type: string;

  @Prop()
  @ApiProperty()
  transactionDateTime: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
