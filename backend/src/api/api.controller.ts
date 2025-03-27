import {
  Controller,
  Get,
} from '@nestjs/common';

import { ApiService } from './api.service';
import { Unprotected } from 'src/common/decorators/unprotected.decorator';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  
  @Unprotected()
  @Get('/health')
  healthCheck() {
    return this.apiService.healthCheck();
  }
}
