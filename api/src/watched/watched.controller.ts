import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';

@Controller('watched')
export class WatchedController {
  constructor(private readonly watchedService: WatchedService) {}

  @Post()
  create(@Body() createWatchedDto: CreateWatchedDto) {
    return this.watchedService.create(createWatchedDto);
  }

  @Get()
  findAll() {
    return this.watchedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWatchedDto: UpdateWatchedDto) {
    return this.watchedService.update(+id, updateWatchedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchedService.remove(+id);
  }
}
