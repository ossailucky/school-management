import { Module, forwardRef } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    forwardRef(() => SubjectModule),
    TypeOrmModule.forFeature([Teacher])
  ],
  providers: [TeachersResolver, TeachersService],
  exports: [ TeachersService]
})
export class TeachersModule {}
