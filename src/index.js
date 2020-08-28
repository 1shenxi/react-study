/**
 * 一、React.createElement & ReactDOM.render
 * React.createElement(type, props, children) 用于构建一个虚拟树，内容和 HTMLElement 的结构相同，但是更为简单。只包含较为必要的属性。
 * 可打印对比。
 * 
 * ReactDOM.render(element, container) 用于将虚拟DOM 和 挂载的DOM 进行关联，从而实现响应。
 *  - element: 是用 React.createElement('div') 构建出来的虚拟DOM，
 *  - container: 是以当前DOM为容器挂载。
 * 
 * 因此，我们可以在任何的项目中，轻松的嵌入式使用React，做到局部使用React
 */

const App = React.createElement('div', { className: 'react-wrap' }, 'a', 'b', 'c');

ReactDOM.render(App, document.querySelector('#root'))

// 创建容器，放在最后的一个div后面
function createContainer(id, callback) {
  // 找到最后一个 div
  const lastDiv = Array.from(document.body.children).reverse().find(item => item.nodeName === 'DIV')
  const container = document.createElement('div')
  container.id = id;
  document.body.insertBefore(container, lastDiv.nextSibling);
  const app = callback();
  ReactDOM.render(app, container)
}

/**
 * 二、React.createElement(type, props, ...children)
 *  - type 标签名
 *  - props 说需要传递下去的数据
 *  - children 子元素，可以是普通文本，也可是DOM(React.createElement)
 */
createContainer('root1', () => {
  // 这里就可以实现多个属性的嵌套了。
  return React.createElement(
    'div',
    {
      className: 'react-wrap',
      currName: '最高层div',
    },
    React.createElement('span', null, 1),
    React.createElement('div', null, 2),
    React.createElement('section', null, 3),
  );
});

/**
 * 三、React.createElement(type, props, ...children)
 * 目前，官方对于 createElement 的重载有8种方法，我们还可能会常用的写法就是 class的写法。
 * 
 * classComponent 的写法就是 createElement 中会调用
 */
createContainer('root2', () => {
  class App2 extends React.Component {
    render() {
      return React.createElement('span', null, '我是通过 class 渲染出来的组件');
    };
  }
  console.log('object', React.createElement(App2))
  return React.createElement('div', {}, React.createElement(App2));
})
