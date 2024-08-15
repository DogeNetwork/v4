self.__dynamic$config = {
  prefix: '/search/',
  encoding: 'base64',
  mode: 'production', 
  logLevel: 0, 
  bare: {
    version: 2, 
    path: '/bare/',
  },
  tab: {
    title: null,
    icon: 'https://google.com/favicon.ico',
    ua: null,
  },
  assets: {
    prefix: '/dynamic/',
    files: {
      handler: 'dynamic.handler.js',
      client: 'dynamic.client.js',
      worker: 'dynamic.worker.js',
      config: 'dynamic.config.js',
      inject: '/dynamic/inject.js',
    }
  },
  block: [
  
  ]
};
