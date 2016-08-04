import { Component } from '@angular/core';
import { NoteCard, NoteCreator} from '../ui';
import { NoteService } from '../services';

@Component({
  selector: 'notes-container',
  directives: [NoteCard, NoteCreator],
  styles:[`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px;
    }

  `],
  template:`
  <div class="row center-xs notes">
        <div class="col-xs-6 creator">
          <note-creator
          (createNote)="onCreateNote($event)"></note-creator>
        </div>
        <div class="notes col-xs-8">
          <div class="row between-xs">
            <note-card
              class="col-xs-4"
              *ngFor = "let note of notes; let i = index"
              (checked)="onNoteChecked($event,i)"
              [note]="note"

            >
            </note-card>
          </div>
        </div>
      </div>
  `

})

export class Notes {

  constructor(private noteService:NoteService){
    this.noteService.getNotes()
    .subscribe(res => this.notes = res.data);
  }

  notes = [];

  onNoteChecked(note, i){
    this.notes.splice(i ,1);
  }

  onCreateNote(note) {
    this.noteService.createNote(note)
    .subscribe(note => this.notes.push(note));
  }




}
