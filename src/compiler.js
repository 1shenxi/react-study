/**
 * @description
 * 1. 首先下载三个包
 * `yarn add -D @babel/core @babel/cli @babel/preset-react`
 * @babel/core: 是babel7 的核心编译包。
 * @babel/cli: 是babel 的脚手架。
 * @babel/preset-react: 是react 的相关babel插件，其中内置了对 jsx 的编译。
 * 
 * 2. 在 `package.json` 中的 `scripts` 加一条编译指令。（先不用别的，看效果.）
 * "scripts": {
 *   "compile": "babel -w --presets @babel/preset-react src/compiler.js -d lib/"
 * }
 * 
 * 3. 命令行中执行，`yarn compile` 就可以实时编译 jsx 了。
 * 
 * 下面对之前的三个案例重新写一次。
 */
((React) => {
  const e = React.createElement;
  // 1. createElement
  // const virtualDom = e(
  //   'div',
  //   { className: 'parent' },
  //   '我是parent',
  //   e('div', { className: 'child' }, '我是child1'),
  //   e('div', { className: 'child' }, '我是child2'),
  //   e('div', { className: 'child' }, '我是child3'),
  // );
  const virtualDom = (
    <div className="parent">
      <div className="child">我是child1</div>
      <div className="child">我是child2</div>
      <div className="child">我是child3</div>
    </div>
  )

  ReactDOM.render(virtualDom, document.querySelector('#root-compiler'));
  
  // 2. classComponent, 一定要继承 React.Component, 不然会报错。
  // class VitrualClassComponent extends React.Component {
  //   render() {
  //     return e('div', null, 'VitrualClassComponent')
  //   }
  // }
  // ReactDOM.render(e(VitrualClassComponent), document.querySelector('#root1'));

  class VitrualClassComponent extends React.Component {
    render() {
      return <div>VitrualClassComponent</div>
    }
  }
  ReactDOM.render(e(VitrualClassComponent), document.querySelector('#root1-compiler'));

  // 3. functionComponent
  // function VitrualFunctionComponent() {
  //   return e('div', null, 'VitrualFunctionComponent')
  // }
  // ReactDOM.render(e(VitrualFunctionComponent), document.querySelector('#root2'));

  function VitrualFunctionComponent() {
    return <div>VitrualFunctionComponent</div>
  }
  ReactDOM.render(e(VitrualFunctionComponent), document.querySelector('#root2-compiler'));

  /**
   * 可以对比 `lib/compiler.js` 中编译后的代码，发现和之前的写法是一模一样。
   * 总结可知，jsx 是对 createElement 的一种更加便捷的写法。
   */

})(React);