import { Test, TestingModule } from '@nestjs/testing';
import { JuniorGradeResolver } from './junior-grade.resolver';
import { JuniorGradeService } from './junior-grade.service';

describe('JuniorGradeResolver', () => {
  let resolver: JuniorGradeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuniorGradeResolver, JuniorGradeService],
    }).compile();

    resolver = module.get<JuniorGradeResolver>(JuniorGradeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
