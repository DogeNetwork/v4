/*export default function websocket(self: Window | any) {
  // ty divide i love you

  const createSocket = (url: string, protocols?: string | string[]): WebSocket => {''
    return self.__dynamic.bare.createWebSocket.apply(
      self.__dynamic.bare,
      [url, protocols || [], {}],
    );
  }

  self.WebSocket = new Proxy(self.WebSocket, {
    construct(target: Function, args: Array<string | string[] | any>): any {
      return createSocket(args[0], args[1]);
    }
  });
}*/

import { encodeProtocol as encode_protocol } from "../core/protocol";

export default function websocket(self: Window | any) {
  const target = () =>
    self.location.protocol.replace('http', 'ws') + '//' + new URL((self.__dynamic$config.bare.path + '/' || '/bare/') + 'v1/', new URL(location.origin)).href
      .replace(/http(s?):\/\//g, '')
      .replace(/\/\//g, '/') as string;

  const WSUrl: PropertyDescriptor | any = Object.getOwnPropertyDescriptor(
    self.WebSocket.prototype,
    "url"
  );

  self.__dynamic.define(self.WebSocket.prototype, "url", {
    get() {
      const url = WSUrl.get.call(this);

      return self.__dynamic.url.decode(url) as string;
    },
    set(val: any) {
      return false;
    },
  });

  self.WebSocket = self.__dynamic.wrap(
    self.WebSocket,
    (e: any, ...args: Array<string | Array<string>>) => {
      console.log(args);
      const url: URL = new URL(args[0] as string);

      const r: any = {
        remote: {
          host: url.hostname,
          port: url.port || (url.protocol === "wss:" ? "443" : "80"),
          path: url.pathname + url.search,
          protocol: url.protocol,
        },
        headers: {
          Host: url.hostname + (url.port ? ":" + url.port : ""),
          Origin: self.__dynamic$location.origin,
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          Upgrade: "websocket",
          Connection: "Upgrade",
        },
        forward_headers: [
          "accept-encoding",
          "accept-language",
          "sec-websocket-extensions",
          "sec-websocket-key",
          "sec-websocket-version",
          "sec-websocket-accept",
        ],
      };

      if (args[1]) {
        r.headers["sec-websocket-protocol"] = args[1].toString();
      }

      return [
        target(),
        ["bare", encode_protocol(JSON.stringify(r))],
      ];
    }
  );
}