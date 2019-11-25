## 快速开始
```
npx create-next-app
```

## 目录结构
```
front
｜———— components   // 组件目录
｜———— pages        // 路由目录,每个.js文件都会被解析成页面路由
｜———— public       // 静态资源目录
```

## 脚本命令
```
{
  "scripts": {
    "dev": "next",	//启动一个热加载的Web服务器（开发模式）
    "build": "next build",	//利用webpack编译应用，压缩JS和CSS资源（发布用）
    "start": "next start"	//启动一个热加载的Web服务器（生产模式），需要先build
  }
}
默认启动端口3000，自定义端口yarn dev -- -p <your port here>
```