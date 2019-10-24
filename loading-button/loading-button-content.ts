import { Subject } from 'rxjs'

export class LoadingButtonContent {
    public constructor(init?:Partial<LoadingButtonContent>) {
        Object.assign(this, init);
    }

    public Icon: string = "fa-check";
    public Text: string = "ACEPTAR";
    public IsSmall: boolean = false;
    public IsLight: boolean = false;
    public LoadingSubject: Subject<any> = new Subject();
}
