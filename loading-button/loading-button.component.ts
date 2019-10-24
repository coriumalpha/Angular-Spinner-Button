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

	public btnIcon: string = 'fa-floppy-o';
	public btnText: string = 'GUARDAR';

	public showAuxiliary: boolean = false;

	ngOnInit() {
		this.configureButtonContent();

		this.buttonContent.LoadingSubject.subscribe(data => {
			if (data === true) {
				this.showAuxiliary = true;
			} else if (data === false) {
				this.hasSucceeded = true;
				setTimeout(x => {
					this.hasSucceeded = false;
					this.showAuxiliary = false;
				}, 3000);
			} else if (data === 'error') {
				this.hasErrors = true;
				setTimeout(x => {
					this.hasErrors = false;
					this.showAuxiliary = false;
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

	private commonClass(): string[] {
		let classes: string[] = [
			'btn'
		];

		if (this.buttonContent.IsSmall) {
			classes.push('btn-sm');
		}

		if (!this.buttonContent.IsOnlyIcon) {
			classes.push('btn-block');
		}

		return classes;
	}

	public mainButtonClass(): string[] {
		let classes: string[] = [
			...this.commonClass(),
			this.succeedClass,
			this.textClass,
		];

		return classes;
	}

	public loadingButtonClass(): string[] {
		let classes: string[] = [
			...this.commonClass(),
			this.hasErrors ? this.errorClass : this.succeedClass,
			this.hasErrors ? 'text-white' : this.textClass,
		];

		return classes;
	}
}
