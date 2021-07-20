# edu-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### some problems

#### 处理全局样式变量时
报错：```Using / for division is deprecated and will be removed in Dart Sass 2.0.0.```

解决方法： 需要在package.json文件里修改"sass": "~1.32.6"即可
