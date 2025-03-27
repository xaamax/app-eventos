import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEventDTO } from '../dtos/create-event.dto';
import { EventDetails } from '../interfaces/event';
import { EVENT_FIELDS } from '../constants';
import { buildPrismaSelect } from 'src/common/helpers/prisma-select.helper';
import { UpdateEventDTO } from '../dtos/update-event.dto';
import { DeleteEventDTO } from '../dtos/delete-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: CreateEventDTO): Promise<EventDetails> {
    const select = buildPrismaSelect<EventDetails>(EVENT_FIELDS);
    return await this.prisma.event.create({
      data,
      select,
    });
  }

  async getEventAll(): Promise<EventDetails[]> {
    return await this.prisma.event.findMany({
      select: buildPrismaSelect<EventDetails>(EVENT_FIELDS),
    });
  }

  async getEventById(id: number): Promise<EventDetails> {
    const model = await this.prisma.event.findUnique({
      where: { id },
      select: buildPrismaSelect<EventDetails>(EVENT_FIELDS, ['category_id']),
    });
    if (!model) throw new NotFoundException('Evento não encontrado.');

    return model;
  }

  async updateEvent(id: number, data: UpdateEventDTO) {
    const model = await this.prisma.event.findUnique({ where: { id } });

    if (!model) throw new NotFoundException('Categoria não encontrada.');

    return this.prisma.event.update({
      where: { id },
      data,
      select: buildPrismaSelect<EventDetails>(EVENT_FIELDS, ['category_id']),
    });
  }

  async deleteEvent(id: number, data: DeleteEventDTO) {
    const model = await this.prisma.event.findUnique({ where: { id } });

    if (!model) throw new NotFoundException('Usuário não encontrado.');

    return this.prisma.event.update({
      where: { id },
      data,
      select: buildPrismaSelect<EventDetails>(EVENT_FIELDS, ['category_id']),
    });
  }
}
