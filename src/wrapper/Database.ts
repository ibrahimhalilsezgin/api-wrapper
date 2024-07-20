import fs from "node:fs";


export default class Database {
    jsonFilePath: string;
    data: {[key:string]: any};
    constructor(path?:string) {
        this.jsonFilePath = path || "./database.json";
        this.data = {};
        if(!this.jsonFilePath.endsWith(".json")) throw Error("Database Dosyasının eki sadece .json olabilir");
        if(!fs.existsSync(this.jsonFilePath)) {
            fs.writeFileSync(this.jsonFilePath, "{}", "utf-8");
            console.log(`${this.jsonFilePath} bulunamadı.. ve oluşturuldu.`);
        };
        this.fetchData();
    }

    fetchData() {
        const savedData = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
        if(typeof savedData == 'object') {
            this.data = savedData;
        }
    }

    saveData() {
        fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }

    getir(key:string) {
        return this.data[key];
    }
    
    degistir(key:string, value:any ) {
        this.data[key] = value;
        this.saveData();
    }
    ekle(key:string, value:number) {
        this.data[key] += value;
        this.saveData();

    }
    cikar(key:string, value:number) {
        this.data[key] -= value;
        this.saveData();

    }
    sil(key:string) {
        delete this.data[key];
        this.saveData();

    }

    temizle() {
        this.data = {};
        this.saveData();

    }

    anahtarlar() {
        return Object.keys(this.data);
    }

    degerler() {
        return Object.values(this.data);
    }

    boyut() {
        return Object.keys(this.data).length;
    }

    toString() {
        return JSON.stringify(this.data, null, 2);
    }

    toJSON() {
        return this.data;
    }

    fromJSON(json:any) {
        this.data = json;
    }

    fromFile(path:string) {
        this.data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    }
}