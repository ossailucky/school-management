import { Injectable } from '@nestjs/common';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { v4 as uuid } from 'uuid';
import { log } from 'console';

@Injectable()
export class ScheduleService {
  constructor(@InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>){}
  async createSchedule(createScheduleInput: CreateScheduleInput): Promise<Schedule>{
    const { eventName, eventDescription, eventDate } = createScheduleInput;
    try {
      
      const dateObjects: Date[] = [];
    for (const dateString of eventDate) {
      const dateObject = new Date(dateString);
    
      if (!isNaN(dateObject.getTime())) {
        // Only push valid dates to the array
        dateObjects.push(dateObject); 
      } else {
        console.error(`Invalid date string: ${dateString}`);
      }
    }
      
      const schedule = this.scheduleRepository.create({
        id: uuid(),
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: dateObjects
      });     
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      throw new error;
    }
  }

  async findAllSchedule(): Promise<Schedule[]> {
    try {
      return await this.scheduleRepository.find();
    } catch (error) {
      throw error;
    }
  }

 async findOneSchedule(id: string): Promise<Schedule> {
    try {
      return await this.scheduleRepository.findOneBy({id:id});
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateScheduleInput: UpdateScheduleInput) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
