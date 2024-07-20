import axios from "axios";
import WebSocket from "ws";
import EventEmitter from "events";
import utils from "./utils/const";
import cache from "./utils/cache";
class Client extends EventEmitter {
    private token: string | null;
    private intents: string | null;
    private guilds: any;
    private bot: null;
    private ws:any;
    constructor() {
        super();
        this.token = null;
        this.intents = null;
        this.bot = null;
        this.guilds = new cache();
    }

    async getChannel(id: number | string) {
        const url = `${utils.apiBaseUrl}channels/${id}`;
        const data = await axios.get(url, {
            headers: {
                Authorization: `Bot ${this.token}`
            },
        });
        return data.data;
    }

    async login(token: string) {
        this.token = token;
        const response = await axios.get(`${utils.apiBaseUrl}gateway/bot`, {
            headers: {
                Authorization: `Bot ${this.token}`,
            }
        });

        const gatewayUrl = response.data.url;
        const ws = new WebSocket(gatewayUrl);
        ws.on('message', (data) => {
            const payload = JSON.parse(data.toString());
            const { t, d, op } = payload;
            

            if (op === 10) {
                const { heartbeat_interval } = d;
                setInterval(() => {
                    ws.send(JSON.stringify({
                        op: 1,
                        d: null
                    }));
                }, heartbeat_interval);
            }
            if (t === 'MESSAGE_CREATE') {
                d.channel = {
                    id: d.channel_id,
                    send: async (content: string, embed: any = null, tts: boolean = false) => {
                        const url = `${utils.apiBaseUrl}channels/${d.channel_id}/messages`;
                        const data = {
                            content,
                            tts,
                            embeds: embed,
                        };
        
                        const res = await axios.post(url, data, {
                            headers: {
                                Authorization: `Bot ${this.token}`,
                                "Content-Type": 'application/json',
                            },
                        });
                        return res.data;
                    }
                };
                this.emit('mesajOluştur', d);
            }
        
            if (t === 'READY') {
                this.emit('hazır', d);
            }

            if(t === 'GUILD_CREATE') {
                this.guilds.add(d.id, d)
                this.emit('sunucu_oluştu', d);
            }
        });
        
        ws.on('open', () => {
            const identifyPayload = {
                op: 2,
                d: {
                    token: this.token,
                    intents: this.intents || 513,
                    properties: {
                        $os: 'Windows',
                        $browser: 'ibo',
                        $device: 'Computer'
                    }
                }
            };
            ws.send(JSON.stringify(identifyPayload));
        });
    }
}

export default Client;
