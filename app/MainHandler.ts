import { Component, OnInit } from '@angular/core';
import { RestClient } from './RestClient';
import { Loglist } from './Loglist';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector:'A-main',
    template: `
    <A-loglist></A-loglist>
    `,
    providers: [RestClient, Loglist]
})
export class MainH implements OnInit{
    constructor() {
     }

    async ngOnInit(){
    }
}