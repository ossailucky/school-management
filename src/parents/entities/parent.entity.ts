import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from  'typeorm';


@Entity()
export class Parents{
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

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @DeleteDateColumn()
    deletedAt: Date;

}

