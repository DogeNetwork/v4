export default function blob(self: Window | any) {
    self.__dynamic.createBlobHandler = async function (blob: Blob, element: HTMLIFrameElement, val: string): Promise<void> {
        const sw: ServiceWorker = (await self.__dynamic.sw.ready).active;
        
        self.__dynamic.sw.addEventListener('message', ({ data: {url} }: MessageEvent) => {
            if (url) {
                self.__dynamic.elements.iframeSrc.set.call(element, url);
            }
        }, {once: true});

        sw.postMessage({type: "createBlobHandler", blob, url: self.__dynamic.modules.base64.encode(val.toString().split('').slice(0, 10)), location: self.__dynamic.location.href});

        return;
    }
}