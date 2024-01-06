import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { ScheduleType } from './entities/schedule.type';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(returns => ScheduleType)
  createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    return this.scheduleService.createSchedule(createScheduleInput);
  }

  @Query(returns => [ScheduleType], { name: 'schedules' })
  findAll() {
    return this.scheduleService.findAllSchedule();
  }

  @Query(returns => ScheduleType, { name: 'schedule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.findOne(id);
  }

  @Mutation(returns => ScheduleType)
  updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    return this.scheduleService.update(updateScheduleInput.id, updateScheduleInput);
  }

  @Mutation(returns => ScheduleType)
  removeSchedule(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.remove(id);
  }
}
