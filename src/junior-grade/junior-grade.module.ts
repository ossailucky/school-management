import { Module, forwardRef } from '@nestjs/common';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGradeResolver } from './junior-grade.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorGrade } from './entities/junior-grade.entity';
import { SubjectModule } from 'src/subject/subject.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    forwardRef(()=> SubjectModule),
    forwardRef(()=> StudentsModule),
    TypeOrmModule.forFeature([JuniorGrade])
  ],
  providers: [JuniorGradeResolver, JuniorGradeService],
  exports: [JuniorGradeService]
})
export class JuniorGradeModule {}
