interface CustomError {
  status:number,
}

class CustomError extends Error {
  constructor(status:number, message:string) {
    super(message);
    this.status = status;
  }
}

export default CustomError;
