const { FuseBox, WebIndexPlugin, CSSPlugin, PurgeCSSPlugin } = require("../../.dev");

const fuse = FuseBox.init({
  homeDir : "src",
  output : "dist/$name.js",
  target : "browser",
  cache: false,
  sourceMaps : true,
  plugins : [
    WebIndexPlugin({
      template: "src/index.tpl"
    }),
    [
      PurgeCSSPlugin({
        content: [
          {
            raw: '<html><body><div class="app dino"></div></body></html>',
            extension: 'html'
          },
        ],
        rejected: false,
      }),
      CSSPlugin({
        outFile: file => `dist/${file}`,
      }),
    ],
  ]
});
fuse.dev();

fuse.bundle("app")
    .watch()
    .hmr()
    .instructions(" > index.ts");
fuse.run();
