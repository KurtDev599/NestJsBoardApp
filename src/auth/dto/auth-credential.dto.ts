import { IsNotEmpty } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  password: string;
}
