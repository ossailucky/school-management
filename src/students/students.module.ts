import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ParentsModule } from 'src/parents/parents.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    forwardRef(()=> ParentsModule),
    forwardRef(()=> SubjectModule),
    TypeOrmModule.forFeature([Student])
  ],
  providers: [StudentsResolver, StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
