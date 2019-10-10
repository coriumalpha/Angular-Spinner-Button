import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input() public buttonContent: any;
  @Input() public loadingSubject: Subject<any>;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

    public isLoading: boolean = false;
    public hasErrors: boolean = false;
    public hasSucceeded: boolean = false;

    public errorClass: string = 'btn-danger';
    public succeedClass: string = 'btn-primary';
    public textClass: string = 'text-white';

    public btnIcon: string = "fa-floppy-o";
    public btnText: string = "GUARDAR";
    public isSmall: boolean = false;

  ngOnInit() {
    this.configureButtonContent();

    this.loadingSubject.subscribe(data => {
      if (data === true) {
        this.isLoading = true;
      }
      if (data === false) {
        this.hasSucceeded = true;
        setTimeout(x => {
          this.hasSucceeded = false;
          this.isLoading = false;
        }, 3000);
      }
      if (data === "error") {
        this.hasErrors = true;
        setTimeout(x => {
          this.hasErrors = false;
          this.isLoading = false;
        }, 4000);
      }
    });
  }

  ngOnChange() {
    this.configureButtonContent();
  }

  onClick($event) {
    this.clickEvent.next($event);
  }

  configureButtonContent() {
    if (this.buttonContent != null &&
      this.buttonContent != undefined) {

      if (this.buttonContent.hasOwnProperty('icon') &&
      this.buttonContent.icon != null &&
      this.buttonContent.icon != undefined) {
        this.btnIcon = this.buttonContent.icon;
      }

      if (this.buttonContent.hasOwnProperty('text') &&
      this.buttonContent.text != null &&
      this.buttonContent.text != undefined) {
        this.btnText = this.buttonContent.text;
      }

      if (this.buttonContent.hasOwnProperty('isSmall') &&
      this.buttonContent.isSmall != null &&
      this.buttonContent.isSmall != undefined &&
      this.buttonContent.isSmall) {
        this.isSmall = true;
      }

      if (this.buttonContent.hasOwnProperty('isLight') &&
      this.buttonContent.isLight) {
        this.succeedClass = 'btn-secondary';
        this.textClass = 'text-primary';
      }
    }
  }

}
