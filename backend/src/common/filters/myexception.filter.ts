import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Injectable,
    InternalServerErrorException,
  } from "@nestjs/common";
  import { Response } from "express";
  
  @Catch()
  @Injectable()
  export class MyExceptionFilter implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse<Response>();
  
      const status =
        exception.getStatus === undefined ? 500 : exception.getStatus();
      const message =
        exception.getResponse === undefined
          ? exception.message
          : exception.getResponse();
  
      if (
        exception instanceof InternalServerErrorException &&
        exception.getResponse === undefined
      ) {
        throw exception;
      }
      return response.status(status).json(message);
    }
  }