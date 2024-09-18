import { Controller, Get } from "@nestjs/common";

@Controller()
export class HomeController {
  @Get()
  public async handleHome(): Promise<string> {
    return "Home";
  }
}
