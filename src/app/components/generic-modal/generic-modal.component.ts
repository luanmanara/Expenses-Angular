import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {

    @Input() title: string = '';

    @ViewChild('template') template?: TemplateRef<any>;

    hideModal: Function = () => {};
}