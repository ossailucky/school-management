import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsResolver } from './parents.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parents } from './entities/parent.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forFeature([Parents])
  ],
  providers: [ParentsResolver, ParentsService],
  exports: [ ParentsService ]
})
export class ParentsModule {}
