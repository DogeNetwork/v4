import { DynamicBundle } from "./client";

const BypassRegex = /^(#|about:|mailto:|blob:|javascript:)/g;
const DataRegex = /^data:([a-z\/A-Z0-9\-\+]+);?(charset\=[\-A-Za-z0-9]+)?;?(base64)?[;,]*(.*)/g;
const WeirdRegex = /^([\/A-Za-z0-9\-%]+)(http[s]?:\/\/.*)/g

export default class DynamicRegex { ctx: DynamicBundle; constructor(ctx: DynamicBundle) {this.ctx = ctx;}; BypassRegex: RegExp = BypassRegex; DataRegex: RegExp = DataRegex; WeirdRegex: RegExp = WeirdRegex; };