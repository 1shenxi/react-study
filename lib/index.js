/**
 * 五、条件渲染&列表渲染
 */
(React => {
  /**
   * 5.1 条件渲染
   *  - if
   *  - &&
   *  - 三目运算符
   */
  class ClassComponent extends React.Component {
    render() {
      // 5.1.1 通过控制返回
      if (this.props.isOpen) {
        return /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5F00\u7740\u7684VVVVV");
      }

      return /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5173\u7740\u7684XXXXX");
    }

  } // 通过 isOpen 控制。


  ReactDOM.render( /*#__PURE__*/React.createElement(ClassComponent, {
    isOpen: true
  }), document.querySelector('#root')); // 5.1.2 变量承载jsx

  class ClassComponent1 extends React.Component {
    render() {
      let showText = null; // 5.1.1 通过控制返回

      if (this.props.isOpen) {
        showText = /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5F00\u7740\u7684VVVVV");
      } else {
        showText = /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5173\u7740\u7684XXXXX");
      }

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "\u6211\u662FClassComponent1"), showText);
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(ClassComponent1, {
    isOpen: false
  }), document.querySelector('#root1')); // 5.2 &&
  // 如果 isOpen 为 true 才会展示，否则不展示。

  class ClassComponent2 extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "\u6211\u662FClassComponent2"), this.props.isOpen && /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5F00\u7740\u7684VVVVV"));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(ClassComponent2, {
    isOpen: true
  }), document.querySelector('#root2')); // 5.3 三目运算符

  class ClassComponent3 extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "\u6211\u662FClassComponent3"), this.props.isOpen ? /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5F00\u7740\u7684VVVVV") : /*#__PURE__*/React.createElement("div", null, "\u73B0\u5728\u662F\u5173\u7740\u7684XXXXX"));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(ClassComponent3, {
    isOpen: true
  }), document.querySelector('#root3'));
})(React);