import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, } from  'typeorm';


@Entity()
export class ClassRoom{
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  className:string;

  @Column()
  classSubjects:string[];

  @Column()
  students:string[];
}

