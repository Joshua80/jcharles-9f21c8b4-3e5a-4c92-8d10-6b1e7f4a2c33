import { IsString, MinLength, IsOptional, IsEnum, IsUUID, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '@hnamdev-7f3a1b92-6d4e-4c8a-9b5f-2e1a3c7d8e90/data';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Setup project', description: 'Title of the task' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Setup NestJS project with TypeORM', description: 'Detailed description of the task' })
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({ example: 'Development', description: 'Category of the task' })
  @IsString()
  @MinLength(3)
  category: string;

  @ApiPropertyOptional({ example: TaskStatus.TODO, enum: TaskStatus, description: 'Current status of the task' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUID of the user assigned to this task' })
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}

// Update DTO derived from Create DTO
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

// DTO for listing tasks with pagination/search/sort
export class ListTaskDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Number of tasks per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ example: 'Setup', description: 'Search term for title, description, or category' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'createdAt', description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'DESC', enum: ['ASC', 'DESC'], description: 'Sort order: ASC or DESC' })
  @IsOptional()
  @IsString()
  @IsEnum(['ASC', 'DESC'] as const)
  sortOrder?: 'ASC' | 'DESC';
}

// DTO for reordering tasks (drag-and-drop)
class TaskPositionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Task UUID' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 0, description: 'New position index' })
  @IsInt()
  @Min(0)
  position: number;
}

export class ReorderTasksDto {
  @ApiProperty({ 
    example: [{ id: 'task-uuid-1', position: 0 }, { id: 'task-uuid-2', position: 1 }],
    description: 'Array of task IDs with their new positions',
    type: [TaskPositionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskPositionDto)
  tasks: TaskPositionDto[];
}