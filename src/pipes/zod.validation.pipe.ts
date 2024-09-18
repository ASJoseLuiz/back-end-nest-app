import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidation implements PipeTransform {
  constructor(private readonly zodSchema: ZodSchema) {}
  transform(value: any) {
    try {
      const parsedValue = this.zodSchema.parse(value);
      return parsedValue;
    } catch (err) {
      throw new BadRequestException({
        error: fromZodError(err),
        message: "Validation Failed",
        statusCode: 400, // badRequest
      });
    }
  }
}
