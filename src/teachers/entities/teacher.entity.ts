import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from  'typeorm';


@Entity()
export class Teacher{
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
    TeacherClass:string;

    @Column()
    subjects:string[];

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date


    @DeleteDateColumn()
    deletedAt: Date;

}