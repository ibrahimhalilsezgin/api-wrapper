interface IEmbed {
    title: string;
    description: string;
    url: string;
    timestamp: string;
    color: number;
    footer: {
        text: string;
        icon_url: string;
    };
    image: {
        url: string;
    };
    thumbnail: {
        url: string;
    };
    author: {
        name: string;
        url: string;
        icon_url: string;
    };
    fields: {
        name: string;
        value: string;
        inline: boolean;
    }[];
}

export default class Embed implements IEmbed {
    title: string = '';
    description: string = '';
    url: string = '';
    timestamp: string = '';
    color: number = 0;
    footer = {
        text: '',
        icon_url: '',
    };
    image = {
        url: '',
    };
    thumbnail = {
        url: '',
    };
    author = {
        name: '',
        url: '',
        icon_url: '',
    };
    fields: {
        name: string;
        value: string;
        inline: boolean;
    }[] = [];
    embed:any = [];

    constructor() {
        return this.embed.embed
    }

    baslik(content: string) {
        if (!content) throw Error('baslik Özelliği Kullanılıcaksa Boş Olamaz.');
        this.embed.push({title: content});
        return this;
    }

    aciklama(content: string) {
        if (!content) throw Error('aciklama Özelliği Kullanılıcaksa Boş Olamaz.');
        this.embed.push({description: content});
        return this;
    }

    setUrl(url: string) {
        if (!url) throw Error('setUrl Özelliği Kullanılıcaksa Boş Olamaz.');
        this.embed.push({url: url});
        return this;
    }

    zamanlama(timestamp: string) {
        if (!timestamp) throw Error('setTimestamp Özelliği Kullanılıcaksa Boş Olamaz.');
        this.embed.push({timestamp: timestamp});
        return this;
    }

    renk(color: number) {
        if (!color) throw Error('renk Özelliği Kullanılıcaksa Boş Olamaz.');
        this.embed.push({color: color});
        return this;
    }

    altbilgi(text: string, icon_url: string) {
        if (!text) throw Error('altbilgi text Özelliği Kullanılıcaksa Boş Olamaz.');
        this.footer.text = text;
        this.footer.icon_url = icon_url;

        this.embed.push({ text: text, icon_url: icon_url ? icon_url : null });
        return this;
    }

    resim(url: string) {
        if (!url) throw Error('resim Özelliği Kullanılıcaksa Boş Olamaz.');
        this.image.url = url;

        this.embed.push({ image: url });
        return this;
    }

    kucukResim(url: string) {
        if (!url) throw Error('kucukResim Özelliği Kullanılıcaksa Boş Olamaz.');
        this.thumbnail.url = url;

        this.embed.push({ thumbnail: url });
        return this;
    }

    yazar(name: string, url: string, icon_url: string) {
        if (!name) throw Error('yazar Özelliği Kullanıcıksa Boş Olamaz');
        this.author.name = name;
        this.author.url = url;
        this.author.icon_url = icon_url; 

        this.embed.push({ author: { name: name, url: url, icon_url: icon_url } });
        return this;
    }

    alanEkle(name: string, value: string, inline: boolean = false) {
        if (!name) throw Error('alanEkle name Özelliği Boş Olamaz.');
        if (!value) throw Error('alanEkle value Özelliği Boş Olamaz.');
        this.fields.push({
            name,
            value,
            inline,
        });

        this.embed.push({ fields: [{ name, value, inline }] });
        return this;
    }
    toJSON():void {
        return this.embed
    }
    
}
