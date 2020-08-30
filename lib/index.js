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
(React => {
  // 7.1 包含
  // 场景：某部分包含上下两部分，上部分固定不动，下部分随意变化。可以使用 `props.children`
  function Header() {
    return /*#__PURE__*/React.createElement("h2", null, "\u6211\u662F\u5934\u90E8");
  }

  function Content1() {
    return /*#__PURE__*/React.createElement("div", null, "1\u6211\u662F\u5185\u5BB91");
  }

  function Content2() {
    return /*#__PURE__*/React.createElement("div", null, "2\u6211\u662F\u5185\u5BB92");
  }

  function App(props) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), props.children);
  } // 可以通过控制 `contentKey` 就可以控制局部内容的展示了。


  let contentKey = 2;
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null, contentKey === 1 ? /*#__PURE__*/React.createElement(Content1, null) : /*#__PURE__*/React.createElement(Content2, null)), document.querySelector('#root1')); // 7.2 内容作为 props 传入。

  function App1(props) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), props.content1, /*#__PURE__*/React.createElement(Header, null), props.content2);
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(App1, {
    content1: /*#__PURE__*/React.createElement(Content1, null),
    content2: /*#__PURE__*/React.createElement(Content2, null)
  }), document.querySelector('#root2'));
})(React);