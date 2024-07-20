# discord-api-wrapper

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```


```ts
import {Client, Embed, Database, Dashboard} from "./src/index";
const client:any = new Client()
const db = new Database();
client.login('');


const embed = new Embed()
.aciklama('sa');
client.on('mesajOluştur', (msg:any) => {
    if(msg.content == "test") {
        msg.channel.send(null, embed)
        db.ekle('elma', 1);
    }
})
client.on('sunucu_oluştu', (guild:any) => {

})
```

This project was created using `bun init` in bun v1.1.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
