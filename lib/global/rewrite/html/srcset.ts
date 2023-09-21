export default {
    encode(val: string | undefined, dynamic: Object | any) {
        if (!val) return val;
        if (!(val.toString())) return val;

        return val.split(', ').map((s: any) => {
            return s.split(' ').map((e: any,i: any)=>{
                if (i == 0) {
                    return dynamic.url.encode(e, dynamic.baseURL || dynamic.meta);
                }
    
                return e;
            }).join(' ');
        }).join(', ');
    },
    decode(val: string | undefined) {
        if (!val) return val;

        return val;
    },
}