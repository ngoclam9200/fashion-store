
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @Column({ type: "simple-array" , default: []})
    list_media_id: number[];

    @Column()
    default_media_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    original_price: number;

    @Column()
    count: number;

    @Column()
    stock: number;

    @Column({default: true})
    is_have_size: boolean;

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


