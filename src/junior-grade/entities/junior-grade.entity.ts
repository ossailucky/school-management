import { Entity, PrimaryColumn, Column, ObjectIdColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from  'typeorm';


@Entity()
export class JuniorGrade {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  studentID: string;

  @Column({ type: 'json', default: [], array: true, nullable: true })
  subjects: { subjectID: string, testScore: number, CA: number, examScore: number, totalScore: number, position: string } [];

  @Column()
  average: number;

  @Column()
  classPosition: string;

  @Column()
  remark: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date;
}