export default class cache extends Map {
    cache: any[];
    constructor() {
        super();
        this.cache = [{id:'123', name:'sa'}];
    }


    get(id: number | string) {
        for (const item in this.cache) {
            if(this.cache[item].id === id) {
                return this.cache[item]
            }
            return Error("[Cache Error]: item not found")
        }
    }
    add(id:string | number, data:any) {
        this.cache.push({id, ...data});
    }
}
