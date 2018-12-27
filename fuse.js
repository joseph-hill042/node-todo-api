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
          EnvPlugin({ PORT: '8080' }),
          this.isProduction &&
            QuantumPlugin({
              bakeApiIntoBundle: 'server',
              uglify: false,
              treeshake: false,
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
