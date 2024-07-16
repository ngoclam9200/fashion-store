import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_user')
export class AddressUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  province_id: number;

  @Column()
  district_id: number;

  @Column()
  ward_code: string;

  @Column()
  is_default: boolean;

  @Column()
  user_id:number;
}
