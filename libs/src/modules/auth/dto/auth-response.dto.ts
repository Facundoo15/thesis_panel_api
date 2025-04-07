export class AuthResponseDTO {
  constructor(
    public subject: number,
    public email: string,
    public token: string,
    public expires: number | null,
    public role: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
