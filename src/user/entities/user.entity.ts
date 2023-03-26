import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn } from  'typeorm';


@Entity()
export class User{
    @ObjectIdColumn()
    _id: string;
    
    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    gender:string;

    @Column()
    role: string;

    @Column()
    DOB: string;

    @Column()
    studentClass:string;

    @Column()
    subjects:string[];

    @DeleteDateColumn()
    deletedAt: Date;

}

export enum Role {
    ADMIN = "admin",
    TEACHER = "teacher",
    PARENT = "parent",
    STUDENT = "student",
    SECRETARY = "secretary"
  }