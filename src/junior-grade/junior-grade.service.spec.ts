import { Test, TestingModule } from '@nestjs/testing';
import { JuniorGradeService } from './junior-grade.service';

describe('JuniorGradeService', () => {
  let service: JuniorGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuniorGradeService],
    }).compile();

    service = module.get<JuniorGradeService>(JuniorGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
