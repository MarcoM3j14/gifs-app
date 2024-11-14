import { GifsService } from './../../../gifs/services/gifs.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get tags(){
    return this.gifsService.tagsHistory;
  }

  searchTag( tag: string) {
    this.gifsService.seachTag(tag);
  }

}
