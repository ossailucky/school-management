import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGrade } from './entities/junior-grade.entity';
import { CreateJuniorGradeInput } from './dto/create-junior-grade.input';
import { UpdateJuniorGradeInput } from './dto/update-junior-grade.input';

@Resolver(() => JuniorGrade)
export class JuniorGradeResolver {
  constructor(private readonly juniorGradeService: JuniorGradeService) {}

  @Mutation(() => JuniorGrade)
  createJuniorGrade(@Args('createJuniorGradeInput') createJuniorGradeInput: CreateJuniorGradeInput) {
    return this.juniorGradeService.create(createJuniorGradeInput);
  }

  @Query(() => [JuniorGrade], { name: 'juniorGrade' })
  findAll() {
    return this.juniorGradeService.findAll();
  }

  @Query(() => JuniorGrade, { name: 'juniorGrade' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.juniorGradeService.findOne(id);
  }

  @Mutation(() => JuniorGrade)
  updateJuniorGrade(@Args('updateJuniorGradeInput') updateJuniorGradeInput: UpdateJuniorGradeInput) {
    return this.juniorGradeService.update(updateJuniorGradeInput.id, updateJuniorGradeInput);
  }

  @Mutation(() => JuniorGrade)
  removeJuniorGrade(@Args('id', { type: () => Int }) id: number) {
    return this.juniorGradeService.remove(id);
  }
}
