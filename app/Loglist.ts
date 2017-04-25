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

    nodeIP = '192.168.0.27:3000';
    logs: Array<string>;
    logstring: string;
    selected : string;
    keys: Array<string>;
    peers : Array<string>;
    peerstring : string;
    nodeips: Array<string>;
    dict: KeyedCollection<string>;

    constructor(private som : RestClient) {
        this.dict = new KeyedCollection<string>();
        this.nodeips = new Array<string>();
        this.peers = new Array<string>();
        this.getPeers();
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


    public getPeers()
    {
        this.som.GetURLStrings('http://' + this.nodeIP +'/meta/peers')
        .subscribe(items => 
        {
            this.peerstring = items;
            let pss = this.peerstring.split('"');
            for(let i = 0; i<pss.length;i=i+5)
            {
                let pip = pss[i+3];
                this.peers.push(pip);
            }
            console.log(this.peers);
        });
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

