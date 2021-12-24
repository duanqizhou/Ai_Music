const AutoPrefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5
  } else {
    remUnit = 37.5
  }
  return {
    plugins: [
      AutoPrefixer({
        browsers: ['last 20 versions', 'android >= 4.0']
      }),
      pxtorem({
        rootValue: remUnit,
        propList: ['*'],
        unitPrecision: 5,
        selectorBlackList: ['van-circle__layer']
      })
    ]
  }
}
