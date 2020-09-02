/**
 * 理解 preset-env 的使用。
 * 本来需要设置babel的编译目标浏览器。
 * 后来使用了 .borowerslistrc ，确定编译后的目标。不仅仅提供给@babel/preset-env, 还提供给 autofixer postcss-preset-env 等。
 *
 * 如何测试自己写的 符合哪些浏览器呢？
 * 直接运行 `npx browserslist` 或者自己写条件 `npx browserslist "> 1%, not dead, last 1 version"`
 */

// 1. 默认转换成 es5 语法。
const a = 10;

// 2. 转换成箭头函数
(() => a)();

// 3. 新语法转化
const b = a ** a;

const c = { userInfo: { username: '1', age: b } };

// 4. 新语法
console.log('c', c?.userInfo?.username);

// 5. Object.entries()
console.log(Object.entries(c));
