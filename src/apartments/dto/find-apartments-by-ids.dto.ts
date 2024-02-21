import { IsArray, IsString } from 'class-validator';

export class FindApartmentsByIdsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
