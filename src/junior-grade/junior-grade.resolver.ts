import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { JuniorGradeService } from './junior-grade.service';
import { JuniorGrade } from './entities/junior-grade.entity';
import { CreateJuniorGradeInput } from './dto/create-junior-grade.input';
import { UpdateJuniorGradeInput } from './dto/update-junior-grade.input';
import { JuniorGradeType } from './entities/junior-grade.type';
import { StudentsService } from 'src/students/students.service';
import { UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/user/entities/user.entity';


@Resolver(() => JuniorGradeType)
export class JuniorGradeResolver {
  constructor(
    private readonly juniorGradeService: JuniorGradeService,
    private readonly studentService: StudentsService
    ) {}

  @Mutation(returns => JuniorGradeType)
  createJuniorGrade(@Args('createJuniorGradeInput') createJuniorGradeInput: CreateJuniorGradeInput) {
    return this.juniorGradeService.createGrade(createJuniorGradeInput);
  }

  @Query(returns => [JuniorGradeType], { name: 'juniorGrades' })
  findAll() {
    return this.juniorGradeService.findAllGrades();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Query(returns => JuniorGradeType, { name: 'juniorGrade' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.juniorGradeService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => JuniorGradeType)
  updateJuniorGrade(
    @Args('updateJuniorGradeInput') updateJuniorGradeInput: UpdateJuniorGradeInput,
    @Args('id', { type: () => ID }) id: string
    ) {
    return this.juniorGradeService.updateJuniorGrade(id, updateJuniorGradeInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => String)
  removeJuniorGrade(@Args('id', { type: () => ID }) id: string) {
    return this.juniorGradeService.removeJuniorGrade(id);
  }

  @ResolveField()
  async studentID(@Parent() grade: JuniorGrade){
    
    return await this.studentService.findOne(grade.studentID);
  }
}
