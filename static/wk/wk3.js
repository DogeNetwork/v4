self.__uv$config = {
    prefix: '/sv/',
    bare: '/bear/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/wk/wk1.js', // handler
    bundle: '/wk/wk2.js', // bundle
    config: '/wk/wk3.js', // config
    sw: '/wk/wk4.js', // sw
};