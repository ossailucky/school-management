import { Module } from '@nestjs/common';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGradeResolver } from './junior-grade.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorGrade } from './entities/junior-grade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JuniorGrade])
  ],
  providers: [JuniorGradeResolver, JuniorGradeService],
  exports: [JuniorGradeService]
})
export class JuniorGradeModule {}
