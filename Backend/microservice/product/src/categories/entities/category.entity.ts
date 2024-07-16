
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    media_id: number;

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @Column({default:false})
    isDeleted: boolean;

    @Column()
    user_id_created: number;

    @Column()
    user_id_updated: number;
}


