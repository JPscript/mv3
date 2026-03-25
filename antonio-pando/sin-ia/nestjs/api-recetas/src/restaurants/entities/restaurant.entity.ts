import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity({ name: 'restaurants', schema: 'public' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  fotografia_url: string | null;

  @Column({ type: 'double precision' })
  latitud: number;

  @Column({ type: 'double precision' })
  longitud: number;

  @OneToMany(() => Recipe, (recipe) => recipe.restaurant)
  recipes: Recipe[];

  @OneToMany(() => Comment, (comment) => comment.restaurant)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.restaurant)
  ratings: Rating[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}