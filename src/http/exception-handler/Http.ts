import {
  BusinessRuleException,
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { HttpErrorType, HttpStatus } from "../enums";
import { HttpResponseModel } from "../models";

export type HttpExceptionHandlerResponse = {
  message: string;
  errorType: HttpErrorType;
  data?: any;
};

export class HttpExceptionHandler {
  static mapErrorToHttpResponseModel(
    error: Error
  ): HttpResponseModel<HttpExceptionHandlerResponse> {
    if (error instanceof BusinessRuleException) {
      return this.mapBusinessRuleException(error);
    }

    if (error instanceof InvalidDataException) {
      return this.mapInvalidDataException(error);
    }

    if (error instanceof NotFoundException) {
      return this.mapNotFoundException(error);
    }

    return this.mapInternalServerErrorException(error);
  }

  private static mapBusinessRuleException(
    error: Error
  ): HttpResponseModel<HttpExceptionHandlerResponse> {
    const parsedError = error as BusinessRuleException;

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: {
        message: parsedError.message,
        errorType: HttpErrorType.BUSINESS,
      },
    };
  }

  private static mapInvalidDataException(
    error: Error
  ): HttpResponseModel<HttpExceptionHandlerResponse> {
    const parsedError = error as InvalidDataException;

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: {
        message: parsedError.message,
        errorType: HttpErrorType.VALIDATION,
        data: parsedError.getErrors(),
      },
    };
  }

  private static mapNotFoundException(
    error: Error
  ): HttpResponseModel<HttpExceptionHandlerResponse> {
    const parsedError = error as NotFoundException;

    return {
      statusCode: HttpStatus.NOT_FOUND,
      body: {
        message: parsedError.message,
        errorType: HttpErrorType.NOT_FOUND,
      },
    };
  }

  private static mapInternalServerErrorException(
    error: Error
  ): HttpResponseModel<HttpExceptionHandlerResponse> {
    const parsedError = error as NotFoundException;

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        message: parsedError.message,
        errorType: HttpErrorType.INTERNAL_SERVER_ERROR,
        data: parsedError,
      },
    };
  }
}
