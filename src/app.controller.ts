import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import db from './db';
import {AppService} from './app.service'
import { Painting } from './painting.tdo';

@Controller()
export class AppController {
   constructor(private appService: AppService) {}

	@Get()
	@Render('index')
	async root() {
		return this.appService.getTitles()
	}

   @Get('paintings/new')
   @Render('insertPainting')
   getPaintings() { }


   @Get('paintings/delete/:id')
   @Redirect()
   deleteAndRedirect(@Param('id') id: number) {
      this.appService.deletePaintingById(id);
      return {
         url: '/'
      }
   }

   @Get('paintings/edit/:id')
   @Render('updatePainting')
   async renderUpdatePainting(@Param('id') id: number) {
      return {painting: await this.appService.getPaintingById(id)};
   }

   @Post('paintings/edit/:id')
   @Redirect()
   handleEdit(@Param('id') id: number, @Body() painting: Painting) {
      painting.id = id;
      this.appService.updatePainting(painting)
      return {
         url: '/'
      }
   }

   @Post('paintings/new')
   @Redirect()
   async insertPainting(@Body() painting: Painting) {
      painting.on_display = painting.on_display == 1
      const row: any = await this.appService.insertPainting(painting);
      
      return {
         url: row.insertId
      }
   }


   @Get('paintings/:id')
   @Render('paintings')
   async showPainting(@Param('id') id: number) {
      const paintings : object = await this.appService.getPaintingById(id);
      if(paintings == null) {
         return {paintings: {on_display: -1}}
      } else {
         return {paintings: paintings}
      }
   }


   

}
