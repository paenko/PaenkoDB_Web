import { Component } from "@angular/core";
import { RestClient } from './RestClient';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'A-loglist',
    template: `
    <h2>Logs</h2>
    Node IP
    <input [(ngModel)]="nodeIP" />
    <button (click)=(getLogs())>Get Logs</button>

    <section *ngIf="logs">
        <div *ngFor="let log of logs">
            <a href="#" (click)="clickLog(log)">{{log}}</a>
        </div>
    
        <section *ngIf="selected">
            <h3>Keys for {{selected}}</h3>
            <div *ngFor="let key of keys">
                <a href="#">{{key}}</a>
            </div>
        </section>
    </section>
    `,
    providers: [RestClient]
})
export class Loglist {

    nodeIP = '207.154.216.94:3000';
    logs: Array<string>;
    logstring: string;
    selected : string;
    keys: Array<string>;

    constructor(private som : RestClient) {
    }

    public getLogs()
    {
        console.log('get logs');
        this.som.GetURLStrings('http://' + this.nodeIP +'/meta/logs')
        .subscribe(items => 
        {
            let a = items.split('\n').reverse();
            a.pop();
            this.logs = a;
        });
    }

    public clickLog(clickedlog : string)
    {
        console.log(clickedlog);
        this.som.GetURL('http://' + this.nodeIP +'/meta/log/'+ clickedlog +'/documents')
        .subscribe(items => 
        {
            this.keys = items;
        });
        this.selected = clickedlog;
    }
}