import path from 'node:path'

import babel from '@babel/core'

/**
 * @this {import('@rspack/core').LoaderContext}
 * @param {string} content 
 * @returns {Promise<void>}
 */
export default async function loader(content) {
  const callback = this.async()

  const result = await babel.transformAsync(content, {
    presets: ['@babel/preset-react'],
    sourceMaps: true,
    // Make relative path the same as `builtin:swc-loader`
    sourceFileName: `./${path.relative(this.rootContext, this.resourcePath)}`,

    // Using absolute path(this.resourcePath) like `swc-loader` and `babel-loader`
    // sourceFileName: this.resourcePath,
  })

  callback(null, result.code, result.map)
  return
}

