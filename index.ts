import {Client, Embed, Database, Dashboard} from "./src/index";
const client:any = new Client()
const db = new Database();
const dashboard = new Dashboard(client);
client.login('');


const embed = new Embed()
.aciklama('sa');
client.on('mesajOluştur', (msg:any) => {
    if(msg.content == "test") {
        msg.channel.send(null, embed)
        db.ekle('sa', 1);
    }
})
client.on('sunucu_oluştu', (guild:any) => {
    // console.log(guild)
})
// console.log(client.guilds.get('123'))