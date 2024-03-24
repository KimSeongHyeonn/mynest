import {
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

export class CommonBigPKEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    DeleteDateColumn: Date | null;
}