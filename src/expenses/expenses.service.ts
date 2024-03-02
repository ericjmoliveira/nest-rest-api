import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createExpenseDto: Prisma.ExpenseCreateInput) {
    return await this.prismaService.expense.create({
      data: {
        ...createExpenseDto,
        date: new Date(createExpenseDto.date),
      },
    });
  }

  async findAll() {
    return this.prismaService.expense.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.expense.findUnique({ where: { id } });
  }

  async update(id: string, updateExpenseDto: Prisma.ExpenseUpdateInput) {
    return this.prismaService.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.expense.delete({ where: { id } });
  }
}
