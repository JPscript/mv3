import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity({ name: 'recipes', schema: 'public' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  restaurant_id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.recipes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text' })
  ingredientes: string;

  @Column({ type: 'int' })
  tiempo_min: number;

  @Column({ type: 'varchar', length: 20 })
  dificultad: 'facil' | 'media' | 'dificil';

  @Column({ type: 'varchar', length: 300, nullable: true })
  image_url: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
