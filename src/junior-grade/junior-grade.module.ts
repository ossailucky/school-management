import { Module } from '@nestjs/common';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGradeResolver } from './junior-grade.resolver';

@Module({
  providers: [JuniorGradeResolver, JuniorGradeService]
})
export class JuniorGradeModule {}
