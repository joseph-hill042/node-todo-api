const { FuseBox, Sparky, QuantumPlugin, EnvPlugin } = require('fuse-box')
const { src, task, watch, context, fuse } = require('fuse-box/sparky')

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target: 'server@esnext',
        hash: this.isProduction,
        sourceMaps: true,
        allowSyntheticDefaultImports: true,
        plugins: [
          EnvPlugin({
            PORT: '8080',
            MONGODB_URI: `mongodb://localhost:27017/todoApp`,
            NODE_ENV: this.isProduction ? 'production' : 'development',
          }),
          this.isProduction &&
            QuantumPlugin({
              bakeApiIntoBundle: 'server',
              uglify: true,
              treeshake: true,
            }) &&
            EnvPlugin({
              PORT: '8080',
              MONGODB_URI: `mongodb://root:${encodeURIComponent(
                'decl@n1124'
              )}@ds251598.mlab.com:51598/node-todo-api`,
              NODE_ENV: this.isProduction ? 'production' : 'development',
            }),
        ],
      })
    }
    createBundle(fuse) {
      const app = fuse.bundle('server')
      if (!this.isProduction) {
        app
          .watch()
          .instructions('> [index.ts]')
          .completed(proc => proc.start())
      }
      app.instructions('> [index.ts]')
      return app
    }
  }
)

task('clean', () =>
  src('dist')
    .clean('dist')
    .exec()
)

task('default', ['clean'], async context => {
  const fuse = context.getConfig()
  fuse.dev({ httpServer: false })
  context.createBundle(fuse)
  await fuse.run()
})

task('dist', ['clean'], async context => {
  context.isProduction = true
  const fuse = context.getConfig()
  context.createBundle(fuse)
  await fuse.run()
})
