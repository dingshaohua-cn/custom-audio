module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      // page 的入口
      entry: 'example/main.js', // 把src 修改为examples
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  css: { extract: false },
};

// 发包到npm的时候，注意把package.json里的依赖项全删除，以及script也删除。