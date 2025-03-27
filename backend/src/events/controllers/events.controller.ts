import { EventsService } from './../services/events.service';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateEventDTO } from '../dtos/create-event.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateEventDTO } from '../dtos/update-event.dto';
import { DeleteEventDTO } from '../dtos/delete-event.dto';

@ApiBearerAuth('Authorization')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('/')
  async findAll() {
    return await this.eventsService.getEventAll();
  }

  @Post('/create')
  async create(
    @Body()
    dto: CreateEventDTO,
  ) {
    return await this.eventsService.createEvent(dto);
  }

  @Get('/:id/details')
  async findOne(@Param('id') id: number) {
    return await this.eventsService.getEventById(+id);
  }

  @Put('/:id/update')
  async update(@Param('id') id: number, @Body() dto: UpdateEventDTO) {
    return await this.eventsService.updateEvent(+id, dto);
  }

  @Patch('/:id/delete')
  async deleteEvent(@Param('id') id: number, @Body() dto: DeleteEventDTO) {
    return await this.eventsService.deleteEvent(+id, dto);
  }
}
