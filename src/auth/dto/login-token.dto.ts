import { IsString } from 'class-validator';

export class LoginToken {
  @IsString()
  readonly accessToken: string;
}
