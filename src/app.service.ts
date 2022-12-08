import { Injectable } from '@nestjs/common';
import db from './db';
import { Painting } from './painting.tdo';

@Injectable()
export class AppService {
   async getTitles() {
      const [rows] = await db.execute('SELECT title, id FROM paintings');

      console.log(rows);
      return {
         paintings: rows,
      };
   }

   async getPaintingById(id: number) {
      const [rows] = await db.execute('SELECT title, year, on_display FROM paintings WHERE id = ?',
      [id]);


      return rows[0]
   }

   async deletePaintingById(id: number) {
      const [rows] = await db.execute('DELETE FROM paintings WHERE id = ?', [id])
      return rows;
   }

   async insertPainting(painting: Painting) {
      const [rows] = await db.execute('INSERT INTO paintings (title, year, on_display) VALUES (?, ?, ?)',
      [painting.title, painting.year, painting.on_display])
      return rows
   }

   async updatePainting(painting: Painting) {
      const [rows] = await db.execute('UPDATE paintings SET title = ?, year = ?, on_display = ? WHERE id = ?',
      [painting.title, painting.year, painting.on_display, painting.id])
      return rows;
   }

}
