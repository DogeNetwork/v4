import location from './methods/core/location';
import get from './methods/core/get';
import window from './methods/core/window';
import dom from './methods/core/html';
import attr from './methods/document/attr';
import worker from './methods/window/worker';
import history from './methods/window/history';
import ws from './methods/window/ws';
import fetch from './methods/window/fetch';
import message from './methods/window/message';
import write from './methods/document/write';
import imports from './methods/window/imports';
import reflect from './methods/core/reflect';
import niche from './methods/window/niche';
import storage from './methods/window/storage';
import navigator from './methods/window/navigator';
import cookie from './methods/document/cookie';
import style from './methods/document/style';
import blob from './methods/window/blob';
import mutation from './methods/document/mutation';
import _eval from './methods/core/eval';
import func from './methods/core/function';
import policy from './methods/window/policy';
import rtc from './methods/window/rtc';

import DynamicClientMethods from './methods';

export default class DynamicClient {
    location;
    get;
    window;
    attr;
    worker;
    history;
    ws;
    fetch;
    message;
    policy;
    write;
    imports;
    reflect;
    niche;
    storage;
    navigator;
    cookie;
    style;
    blob;
    mutation;
    eval;
    func;
    rtc;
    dom;

    define: any;
    wrap: any;

    methods = DynamicClientMethods;

    ctx;

    constructor(ctx: any) {
        if (self.constructor.name == "DedicatedWorkerGlobalScope" || self.constructor.name == "SharedWorkerGlobalScope") {
            this.message = message;
            this.location = location;
            this.window = window;
            this.get = get;
            this.reflect = reflect;
            this.imports = imports;
            this.blob = blob;
            this.mutation = mutation;
        } else {
            this.location = location;
            this.get = get;
            this.window = window;
            this.attr = attr;
            this.worker = worker;
            this.history = history;
            this.ws = ws;
            this.fetch = fetch;
            this.message = message;
            this.policy = policy;
            this.write = write;
            this.imports = imports;
            this.reflect = reflect;
            this.niche = niche;
            this.storage = storage;
            this.navigator = navigator;
            this.cookie = cookie;
            this.style = style;
            this.blob = blob;
            this.mutation = mutation;
            this.eval = _eval;
            this.func = func;
            this.rtc = rtc;
            this.dom = dom;
        }

        this.ctx = ctx;
    }
}