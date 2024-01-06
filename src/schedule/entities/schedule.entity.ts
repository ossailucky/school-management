import { Entity, PrimaryColumn, Column, ObjectIdColumn } from  'typeorm';


@Entity()
export class Schedule{
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  eventName: string;

  @Column()
  eventDescription: string;

  @Column()
  eventDate: Date[];
}
