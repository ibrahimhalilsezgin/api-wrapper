import express from "express";
const app = express();
export default class Dashboard {
    client:any;
    constructor(client:any){
        this.client = client;
    }
    listen(port:number){              
    app.get('/', (req, res) => {
        res.send(`
                    
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dashboard - ${this.client.bot}</title>
            </head>
            <body>
                Servers : ${this.client.servers.cache.length}
                Members : ${this.client.members.cache.length}
                Channels : ${this.client.channels.cache.length}
            </body>
        </html>
            
        `) 
    })
    app.listen(port)
    return app;
        }
}