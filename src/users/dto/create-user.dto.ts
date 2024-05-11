import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  readonly address: string;
}
