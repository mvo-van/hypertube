import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const statusCode = 300;

        if (status >= 500) {
            this.logger.error(`[${statusCode}]: ${status}`);

            response
                .status(statusCode)
                .json({
                    statusCode: statusCode,
                    timestamp: new Date().toISOString(),
                    path: request.url
                });

        }
    }
}