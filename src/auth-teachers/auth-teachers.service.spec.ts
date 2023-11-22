import { Test, TestingModule } from '@nestjs/testing';
import { AuthTeachersService } from './auth-teachers.service';

describe('AuthTeachersService', () => {
  let service: AuthTeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTeachersService],
    }).compile();

    service = module.get<AuthTeachersService>(AuthTeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
