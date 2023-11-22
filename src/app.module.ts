import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/guards/jwt.strategy';
import { ClassRoomModule } from './class-room/class-room.module';
import { ClassRoom } from './class-room/entities/class-room.entity';
import { SubjectModule } from './subject/subject.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ParentsModule } from './parents/parents.module';
import { AuthStudentsModule } from './auth-students/auth-students.module';
import { AuthParentsModule } from './auth-parents/auth-parents.module';
import { AuthTeachersModule } from './auth-teachers/auth-teachers.module';
import { Student } from './students/entities/student.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url:process.env.MONGODB_CONNECT,
      synchronize:true,
      useUnifiedTopology:true,
      entities: [
        User,
        ClassRoom,
        Student
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    UserModule,
    AuthModule,
    ClassRoomModule,
    SubjectModule,
    StudentsModule,
    TeachersModule,
    ParentsModule,
    AuthStudentsModule,
    AuthParentsModule,
    AuthTeachersModule,

  ],
  providers:[JwtStrategy]
  
})
export class AppModule {}
