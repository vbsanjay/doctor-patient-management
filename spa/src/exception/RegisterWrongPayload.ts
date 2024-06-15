export class RegisterWrongPayload extends Error {
  constructor() {
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegisterWrongPayload);
    }

    this.name = "RegisterWrongPayload";
  }
}
