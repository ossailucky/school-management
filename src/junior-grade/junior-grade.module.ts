import { Module, forwardRef } from '@nestjs/common';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGradeResolver } from './junior-grade.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorGrade } from './entities/junior-grade.entity';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    forwardRef(()=> SubjectModule),
    TypeOrmModule.forFeature([JuniorGrade])
  ],
  providers: [JuniorGradeResolver, JuniorGradeService],
  exports: [JuniorGradeService]
})
export class JuniorGradeModule {}
