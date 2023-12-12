import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ParentsModule } from 'src/parents/parents.module';
import { SubjectModule } from 'src/subject/subject.module';
import { StudentAuthGuard } from 'src/auth-students/guards/jwt-students-auth-guard';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Module({
  imports: [
    forwardRef(()=> ParentsModule),
    forwardRef(()=> SubjectModule),
    TypeOrmModule.forFeature([Student])
  ],
  providers: [StudentsResolver, StudentsService, StudentAuthGuard, GqlAuthGuard],
  exports: [StudentsService]
})
export class StudentsModule {}
