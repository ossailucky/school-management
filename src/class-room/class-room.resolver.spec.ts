import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomResolver } from './class-room.resolver';
import { ClassRoomService } from './class-room.service';

describe('ClassRoomResolver', () => {
  let resolver: ClassRoomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassRoomResolver, ClassRoomService],
    }).compile();

    resolver = module.get<ClassRoomResolver>(ClassRoomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
