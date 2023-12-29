import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGrade } from './entities/junior-grade.entity';
import { CreateJuniorGradeInput } from './dto/create-junior-grade.input';
import { UpdateJuniorGradeInput } from './dto/update-junior-grade.input';
import { JuniorGradeType } from './entities/junior-grade.type';
import { SubjectService } from 'src/subject/subject.service';
import { SubjectType } from 'src/subject/entities/subject.type';

@Resolver(() => JuniorGradeType)
export class JuniorGradeResolver {
  constructor(
    private readonly juniorGradeService: JuniorGradeService,
    private readonly subjectService: SubjectService
    ) {}

  @Mutation(returns => JuniorGradeType)
  createJuniorGrade(@Args('createJuniorGradeInput') createJuniorGradeInput: CreateJuniorGradeInput) {
    return this.juniorGradeService.createGrade(createJuniorGradeInput);
  }

  @Query(returns => [JuniorGradeType], { name: 'juniorGrades' })
  findAll() {
    return this.juniorGradeService.findAllGrades();
  }

  @Query(returns => JuniorGradeType, { name: 'juniorGrade' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.juniorGradeService.findOne(id);
  }

  @Mutation(returns => JuniorGradeType)
  updateJuniorGrade(@Args('updateJuniorGradeInput') updateJuniorGradeInput: UpdateJuniorGradeInput) {
    return this.juniorGradeService.update(updateJuniorGradeInput.id, updateJuniorGradeInput);
  }

  @Mutation(returns => JuniorGradeType)
  removeJuniorGrade(@Args('id', { type: () => Int }) id: number) {
    return this.juniorGradeService.remove(id);
  }

  @ResolveField(returns => SubjectType,{name:"subjectID"})
  async subjectID(@Parent() grade: JuniorGrade){
    const subjectIDs = grade.subjects.map(subject => subject.subjectID);
    console.log(subjectIDs);
    
    return await this.subjectService.getManySubjects(subjectIDs);
  }
}
