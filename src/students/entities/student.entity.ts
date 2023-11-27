import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column({type: String})
  firstName:string;

  @Column({type: String})
  lastName: string;

  @Column({type: String})
  email: string;

  @Column({type: String})
  password: string;

  @Column({type: String})
  gender:string;

  @Column({type: String})
  role: string;

  @Column({type:Date})
  DOB: Date;

  @Column({type: String})
  studentClass:string;

  @Column()
  subjects:string[];

  @Column()
  parents: string[];

  @Column()
  teachers: string[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date;
}
