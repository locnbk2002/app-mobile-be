import { IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly address: string;
}
