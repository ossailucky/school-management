import { Entity, PrimaryColumn, Column, ObjectIdColumn } from  'typeorm';


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
    DOB: Date;

}