import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, } from  'typeorm';


@Entity()
export class Subject{
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  className: string[];

  @Column()
  teachers: string[];

  @Column()
  students: string[];
}

