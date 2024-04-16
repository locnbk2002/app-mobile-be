import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  firstName: string;

  @Prop()
  @ApiProperty()
  lastName: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
