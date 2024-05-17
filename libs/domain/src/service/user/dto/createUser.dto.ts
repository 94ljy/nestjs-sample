export class CreateUserDto {
  constructor(
    public email: string,
    public password: string,
  ) {}
}
