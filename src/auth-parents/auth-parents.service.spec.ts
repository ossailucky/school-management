import { Test, TestingModule } from '@nestjs/testing';
import { AuthParentsService } from './auth-parents.service';

describe('AuthParentsService', () => {
  let service: AuthParentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthParentsService],
    }).compile();

    service = module.get<AuthParentsService>(AuthParentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
