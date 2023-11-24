import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn } from  'typeorm';


@Entity()
export class Parent{
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
    children:string[];

    @DeleteDateColumn()
    deletedAt: Date;

}

