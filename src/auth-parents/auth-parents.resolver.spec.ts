import { Test, TestingModule } from '@nestjs/testing';
import { AuthParentsResolver } from './auth-parents.resolver';
import { AuthParentsService } from './auth-parents.service';

describe('AuthParentsResolver', () => {
  let resolver: AuthParentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthParentsResolver, AuthParentsService],
    }).compile();

    resolver = module.get<AuthParentsResolver>(AuthParentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
