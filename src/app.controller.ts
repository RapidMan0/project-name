import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('myname')
export class AppNameController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName(): string {
    return "Vlad Cebotari";
  }
}
