const { FuseBox } = require('fuse-box')
const { src, task, context } = require('fuse-box/sparky')

task('clean', async context => {
  await src('./dist')
    .clean('dist/')
    .exec()
})

const fuse = FuseBox.init({
  target: 'server@esnext',
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
  allowSyntheticDefaultImports: true,
})

fuse.dev({ httpServer: false })

fuse
  .bundle('app')
  .watch()
  .instructions(' > [index.ts]')
  .completed(proc => proc.start())
fuse.run()
