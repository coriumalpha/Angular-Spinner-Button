import { Component, OnInit, Input } from '@angular/core';
import { LoadingButtonContent } from './loading-button-content';

@Component({
	selector: 'loading-button',
	templateUrl: './loading-button.component.html',
	styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

	@Input() public buttonContent: LoadingButtonContent;

	constructor() { }

	public hasErrors: boolean = false;
	public hasSucceeded: boolean = false;

	public errorClass: string = 'btn-danger';
	public succeedClass: string = 'btn-primary';
	public textClass: string = 'text-white';

	public btnIcon: string = "fa-floppy-o";
	public btnText: string = "GUARDAR";

	ngOnInit() {
		this.configureButtonContent();

		this.buttonContent.LoadingSubject.subscribe(data => {
			if (data === false) {
				this.hasSucceeded = true;
				setTimeout(x => {
					this.hasSucceeded = false;
				}, 3000);
			} else if (data === "error") {
				this.hasErrors = true;
				setTimeout(x => {
					this.hasErrors = false;
				}, 4000);
			}
		});
	}

	ngOnChange() {
		this.configureButtonContent();
	}

	private configureButtonContent() {
		if (this.buttonContent != null &&
			this.buttonContent != undefined) {

			if (this.buttonContent.IsLight) {
				this.succeedClass = 'btn-secondary';
				this.textClass = 'text-primary';
			}
		}
	}

}
