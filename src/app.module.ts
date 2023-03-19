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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url:process.env.MONGODB_CONNECT,
      synchronize:true,
      useUnifiedTopology:true,
      entities: [
        User
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    UserModule,
    AuthModule,

  ],
  providers:[JwtStrategy]
  
})
export class AppModule {}
