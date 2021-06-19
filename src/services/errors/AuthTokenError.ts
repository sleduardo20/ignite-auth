export class AuthTokenError extends Error {
  constructor() {
    super('Erorr with authentication token.');
  }
}
