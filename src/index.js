/**
 * 七、组合&继承
 */

 /**
  * 先说继承，官方文档说没必要。。。
  * 在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。
  * Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。
  * 如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。
  */
 
// 因此，核心放在组合上。
((React) => {
  // 7.1 包含
  // 场景：某部分包含上下两部分，上部分固定不动，下部分随意变化。可以使用 `props.children`
  function Header() {
    return <h2>我是头部</h2>
  }

  function Content1 () {
    return <div>1我是内容1</div>
  }

  function Content2 () {
    return <div>2我是内容2</div>
  }

  function App(props) {
    return (
      <div>
        <Header />
        { props.children }
      </div>
    )
  }
  // 可以通过控制 `contentKey` 就可以控制局部内容的展示了。
  let contentKey = 2;
  ReactDOM.render((
    <App>
      { contentKey === 1 ? <Content1 /> : <Content2 /> }
    </App>
  ), document.querySelector('#root1'))

  // 7.2 内容作为 props 传入。
  function App1(props) {
    return (
      <div>
        <hr></hr>
        { props.content1 }
        <Header />
        { props.content2 }
      </div>
    )
  }

  ReactDOM.render((
    <App1 content1={ <Content1 /> } content2={ <Content2 /> } />
  ), document.querySelector('#root2'))

})(React);
