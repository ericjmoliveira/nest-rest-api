import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return await this.prismaService.expense.create({
      data: { ...createExpenseDto, date: new Date(createExpenseDto.date) },
    });
  }

  async findAll() {
    return this.prismaService.expense.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.expense.findUnique({ where: { id } });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.prismaService.expense.update({
      where: { id },
      data: updateExpenseDto.date
        ? { ...updateExpenseDto, date: new Date(updateExpenseDto.date) }
        : updateExpenseDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.expense.delete({ where: { id } });
  }
}
