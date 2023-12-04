import { Module, forwardRef } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [
    forwardRef(()=> TeachersModule),
    TypeOrmModule.forFeature([Subject])
  ],
  providers: [SubjectResolver, SubjectService],
  exports: [ SubjectService]
})
export class SubjectModule {}
