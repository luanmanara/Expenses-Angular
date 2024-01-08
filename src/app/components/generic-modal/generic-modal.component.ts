import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {

    @Input() title: string = '';

    @ViewChild('template') template?: string | TemplateRef<any>;

    hideModal: Function = () => {};
}