module.exports ={
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    // 'postcss-import': { root: file.dirname },
    // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
    require('autoprefixer')(
      {
        // browsers: ["last 5 versions"]
      }
    )
    // 'cssnano': env === 'production' ? options.cssnano : false
  ]
}
