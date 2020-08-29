/**
 * 一、JSX 的写法
 * 
 * 上一个分支先大致说了3种写法。
 * 1. createElement
 * 2. classComponent
 * 3. functionComponent
 */
((React) => {
  const e = React.createElement;
  // 1. createElement
  const virtualDom = e(
    'div',
    { className: 'parent' },
    '我是parent',
    e('div', { className: 'child' }, '我是child1'),
    e('div', { className: 'child' }, '我是child2'),
    e('div', { className: 'child' }, '我是child3'),
  );

  ReactDOM.render(virtualDom, document.querySelector('#root'));
  
  // 2. classComponent, 一定要继承 React.Component, 不然会报错。
  class VitrualClassComponent extends React.Component {
    render() {
      return e('div', null, 'VitrualClassComponent')
    }
  }

  ReactDOM.render(e(VitrualClassComponent), document.querySelector('#root1'));

  // 3. functionComponent
  function VitrualFunctionComponent() {
    return e('div', null, 'VitrualFunctionComponent')
  }

  ReactDOM.render(e(VitrualFunctionComponent), document.querySelector('#root2'));

  /**
   * 由于写法过于繁琐，因此，为了jsx 的写法。但是 jsx 的写法是不被原生支持的，是需要被编译后才可以运行。
   * 因此，我们通过 Babel 的进行编译。请看，`src/compiler.js`
   */

})(React);
