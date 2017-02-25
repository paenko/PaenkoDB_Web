import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from '@angular/http';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { RestClient } from './RestClient';
import { Loglist } from './Loglist';
import 'rxjs/Rx';
import { MainH } from './MainHandler';
import { FormsModule } from '@angular/forms';
 
@NgModule({
    declarations: [RestClient, Loglist, MainH],
    imports: [BrowserModule, HttpModule, JsonpModule, FormsModule],
    bootstrap: [MainH]
})
export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);


