import MetaURL from "../meta/type";
import DynamicRewrites from "../rewrite";

export default class manifest {

  ctx;

  config = {
    rewrite: [
        ['icons', 'urlit'],
        ['name', ' - Dynamic'],
        ['start_url', 'url'],
        ['scope', 'url'],
        ['short_name', ' - Dynamic'],
        ['shortcuts', 'urlev'],
    ],
    delete: [
        'serviceworker'
    ]
  }

  constructor(ctx: DynamicRewrites) {
    this.ctx = ctx.ctx;
  }

  rewrite(this: manifest, src: string, meta: MetaURL) {
    const manifest = JSON.parse(src);

    for (let config in this.config) {
        if (config == 'rewrite') {
            for (var [name, action] of this.config[config]) {
                if (action == 'urlit' && manifest[name]) {
                    for (var i = 0; i < manifest[name].length; i++) {
                        manifest[name][i].src = this.ctx.url.encode(manifest[name][i].src, meta);
                    }

                    continue;
                }

                if (action == 'urlev' && manifest[name]) {
                    for (var i = 0; i < manifest[name].length; i++) {
                        manifest[name][i].url = this.ctx.url.encode(manifest[name][i].url, meta);
                    }

                    continue;
                }

                if (action == 'url' && manifest[name]) {
                    manifest[name] = this.ctx.url.encode(manifest[name], meta);

                    continue;
                }

                if (action == 'url' || action == 'urlit' || action == 'urlev') continue;

                manifest[name] = manifest[name] + action;
            }
        } else if (config == 'delete') {
            for (var name of this.config[config]) {
                if (manifest[name]) delete manifest[name];
            }
        }
    }

    return JSON.stringify(manifest) as string;
  }
}