import {Component} from "@angular/core";
import {Http} from '@angular/http';

@Component({
    selector: 'A-rstc',
    template: `<h1>unused</h1>`
})
export class RestClient
{
    constructor(private http:Http) {  }

    public GetURL(url : string)
    {
        console.log(url);
        return this.http.get(url).map(response => response.json());
    }

    public GetURLStrings(url : string)
    {
        console.log(url);
        return this.http.get(url).map(response => response.text());
    }
}