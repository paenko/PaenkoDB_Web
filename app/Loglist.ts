import { Component } from "@angular/core";
import { RestClient } from './RestClient';
import { FormsModule } from '@angular/forms';
import { KeyedCollection } from './KeyedC';

@Component({
    selector:'A-loglist',
    templateUrl: 'main.html',
    providers: [RestClient]
})
export class Loglist {

    nodeIP = '207.154.216.94:3000';
    logs: Array<string>;
    logstring: string;
    selected : string;
    keys: Array<string>;
    nodeips: Array<string>;
    dict: KeyedCollection<string>;

    constructor(private som : RestClient) {
        this.dict = new KeyedCollection<string>();
    }

    public AddNode(node : string)
    {
        this.nodeips.push(node);
    }

    public getDictKeys(dictlog: string) : Array<string>
    {
        let sublog = new Array<string>();
        this.dict.Keys().forEach(e => {
            if(this.dict.Item(e) == dictlog)
            {
                sublog.push(e);
            }
        });
        console.log(sublog);
        return sublog;
    }

    public getDictLogs() : Array<string>
    {
        return this.remove_duplicates(this.dict.Values());
    }

    public remove_duplicates(arr: Array<string>) {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i]] = true;
        }
        arr = [];
        for (let key in obj) {
            arr.push(key);
        }
        return arr;
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
            this.logs.forEach(e => {
                this.som.GetURL('http://' + this.nodeIP +'/meta/log/'+ e +'/documents')
                .subscribe(items => 
                {
                    this.keys = items;
                    
                    this.keys.forEach(x => {
                        this.dict.Add(x, e);
                    });
                });
            });
        });
    }
}

