import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsResolver } from './parents.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parent])
  ],
  providers: [ParentsResolver, ParentsService],
  exports: [ ParentsService ]
})
export class ParentsModule {}
