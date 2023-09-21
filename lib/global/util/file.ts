declare const self: any;

export default function File(req: Request) {
    return req.url.toString().substr(location.origin.length, req.url.toString().length).startsWith(self.__dynamic$config.assets.prefix);
};