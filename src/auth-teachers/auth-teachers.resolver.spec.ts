import { Test, TestingModule } from '@nestjs/testing';
import { AuthTeachersResolver } from './auth-teachers.resolver';
import { AuthTeachersService } from './auth-teachers.service';

describe('AuthTeachersResolver', () => {
  let resolver: AuthTeachersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTeachersResolver, AuthTeachersService],
    }).compile();

    resolver = module.get<AuthTeachersResolver>(AuthTeachersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
