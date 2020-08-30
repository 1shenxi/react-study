/**
 * 四、事件处理
 */
(React => {
  // 4.1 函数组件的绑定方法。
  function handleClick(e) {
    console.log('e :>> ', e); // NOTE: 区别1：其中的事件对象 event，在 react 中是被特殊处理过的，因此不存在兼容问题. 
    // 此外，React 中的 event 是被简化过的，可以打印当前中的 e，然后去打印一个原生的 event 查看区别。

    alert('你点击函数式组件中的按钮');
  }

  function FunctionComponent() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "FunctionComponent \u51FD\u6570\u5F0F\u7EC4\u4EF6"), /*#__PURE__*/React.createElement("button", {
      onClick: handleClick
    }, "\u70B9\u51FB alert \u51FD\u6570\u5F0F\u7EC4\u4EF6"));
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(FunctionComponent, null), document.querySelector('#root')); // 4.2 类组件的绑定方法。

  class ClassComponent extends React.Component {
    constructor(props) {
      super(props);

      this.handleClick4 = () => {
        console.log('ClassComponent 绑定方法4', this);
      };

      this.handleClick1 = function handleClick() {
        console.log('ClassComponent 绑定方法1', this);
      };

      this.handleClick3 = function handleClick3() {
        console.log('ClassComponent 绑定方法3', this);
      };
    } // NOTE: 这种写法是 ES6 中对类上绑定方法的写法，详情参考 ES6 中的 class。


    handleClick2() {
      console.log('ClassComponent 绑定方法2', this);
    } // INFO: 根据上面会发现一个问题，this 都是 undefined， 然后实际场景经常会需要拿到上下文环境的一些数据去操作。如何解决？
    // 4.2.1 bind
    // 4.2.2 空函数内调用。
    // INFO: 4.2.3  `public class fields` 语法，注意的是这个是实验性语法，不被支持，因此，加入了一个babel插件支持。


    // 4.2.3 的编译结果等价，可以参考 `lib/index.js` 的结果。
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "ClassComponent \u7C7B\u7EC4\u4EF6"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick1
      }, "class \u7ED1\u5B9A\u65B9\u6CD51"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick2
      }, "class \u7ED1\u5B9A\u65B9\u6CD52"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick3.bind(this)
      }, "class \u7ED1\u5B9A\u65B9\u6CD53"), /*#__PURE__*/React.createElement("button", {
        onClick: () => this.handleClick3()
      }, "class \u7ED1\u5B9A\u65B9\u6CD53 \u4E4B 2"), /*#__PURE__*/React.createElement("button", {
        onClick: () => this.handleClick4()
      }, "class \u7ED1\u5B9A\u65B9\u6CD54"));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(ClassComponent, null), document.querySelector('#root1'));
  /**
   * 总结：
   * 1. bind 的写法过于繁琐，并且，额外的操作势必操作一定的性能损耗。
   * 2. 平常还好，如果该函数是父级传递下去的函数的话，就会造成性能浪费。
   */
  // NOTE: 对总结2的解释。

  function Children() {
    return /*#__PURE__*/React.createElement("div", null, "Children");
  }

  function clickEvent() {
    console.log('被点击了。');
  } // 这里，只要 Parent 被重新渲染，Children 就会被重新渲染，因为箭头函数是重新创建的新的。


  function Parent() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Children, {
      clickOpera: () => clickEvent()
    }));
  }
})(React);