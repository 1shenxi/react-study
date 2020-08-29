/**
 * 一、Props & State & 生命周期
 */
(React => {
  // 关键1: Props 就是上层组件传入到当前组件的一些动态数据列表。
  // 例1: 函数式组件的props 来自第一个参数。
  function Clock(props) {
    return /*#__PURE__*/React.createElement("div", {
      className: "clock"
    }, /*#__PURE__*/React.createElement("p", null, "Clock \u5F53\u524D\u65F6\u95F4"), /*#__PURE__*/React.createElement("p", null, props.date.toLocaleTimeString()));
  }

  setInterval(() => {
    // 每次动态的去修改 date 中的值。会发现只有 date 那部分的数据一直被修改。这就是虚拟DOM 的只修改局部
    ReactDOM.render( /*#__PURE__*/React.createElement(Clock, {
      date: new Date()
    }), document.querySelector('#root'));
  }, 1000); // 对比类组件。props 存在与类实例上.（也就是 this 上）

  class ClockClassComp extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "clock"
      }, /*#__PURE__*/React.createElement("p", null, "ClockClassComp \u5F53\u524D\u65F6\u95F4"), /*#__PURE__*/React.createElement("p", null, this.props.date.toLocaleTimeString()));
    }

  }

  setInterval(() => {
    // 每次动态的去修改 date 中的值。会发现只有 date 那部分的数据一直被修改。这就是虚拟DOM 的只修改局部
    ReactDOM.render( /*#__PURE__*/React.createElement(ClockClassComp, {
      date: new Date()
    }), document.querySelector('#root1'));
  }, 1000); // 关键2: Props 只具有可读性。在组件中修改 props，不会被修改成功。

  function Clock1(props) {
    setInterval(() => {
      props.date = new Date();
    }, 1000);
    return /*#__PURE__*/React.createElement("div", {
      className: "clock"
    }, /*#__PURE__*/React.createElement("p", null, "Clock1 \u5F53\u524D\u65F6\u95F4"), /*#__PURE__*/React.createElement("p", null, props.date.toLocaleTimeString()));
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(Clock1, {
    date: new Date()
  }), document.querySelector('#root2')); // 关键3: state 是当前组件内部的一个数据集合，和 Props极其相似，只不过 state 是私有的。
  // 根据上面案例，会发现，计时器的会被重写多次。理想情况下，我们希望只写一次，因此: 

  class Clock2ClassComp extends React.Component {
    constructor(props) {
      super(props); // ⚠️注意：constructor 中初始化 state 可以直接给属性赋予值，之后只能通过 setState 赋值。

      this.state = {
        date: new Date()
      };
      setInterval(() => {
        if (this.props.msg) {
          console.log('Clock2ClassComp => props.msg :>> ', this.props.msg);
        }

        this.setState({
          date: new Date()
        });
      }, 1000);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "clock"
      }, /*#__PURE__*/React.createElement("p", null, "Clock2ClassComp \u5F53\u524D\u65F6\u95F4"), /*#__PURE__*/React.createElement("p", null, this.state.date.toLocaleTimeString()));
    }

  }

  const Wrap = /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'pink'
    }
  }, /*#__PURE__*/React.createElement(Clock2ClassComp, null), /*#__PURE__*/React.createElement(Clock2ClassComp, null), /*#__PURE__*/React.createElement(Clock2ClassComp, null));
  ReactDOM.render(Wrap, document.querySelector('#root-compiler')); // 至于为什么不用 函数式组件 写，是因为，目前学到的函数式组件是不具有上下文环境的，因此，也就没有this，也就没有state，
  // 如果在函数式组件中使用上述写法，感觉应该在 `hooks` 中会有。
  // 提问：上述中实现了 state ，来实现更新时间，但是有个问题。如果组件销毁，setInterval 还会在吗？试验一下：
  // 1. 给 props 中增加一个 msg 字段，在 setInterval 中输出。

  const Wrap1 = /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'skyblue'
    }
  }, /*#__PURE__*/React.createElement(Clock2ClassComp, {
    msg: "123"
  }));
  ReactDOM.render(Wrap1, document.querySelector('#root1-compiler')); // 2. 2s 后清空 document.querySelector('#root1-compiler') 中的虚拟DOM

  setTimeout(() => {
    ReactDOM.render(null, document.querySelector('#root1-compiler'));
  }, 2000); // 这时候，会发现，html 中，已经没有Wrap1相关的真实DOM了，但是控制台下还是会一直打印 msg。
  // 所以，我们应该在特定的时候，来销毁这个 setInterval, 因此，生命周期要出来了。
  // 关键4: 生命周期
  // React 的生命周期有很多个，先只学2个：
  // componentDidMount: 当组件（DOM）渲染完成后触发。
  // componentWillUnmount: 当组件卸载（DOM 删除）前触发。
  // 基于思考，我们可以知道将 setInterval 的初始化放在 componentDidMount，卸载放在 componentWillUnmount，如下：

  class Clock3ClassComp extends React.Component {
    constructor(props) {
      super(props); // ⚠️注意：constructor 中初始化 state 可以直接给属性赋予值，之后只能通过 setState 赋值。

      this.state = {
        date: new Date()
      };
    }

    componentDidMount() {
      // 当然也没说不可以放在 constructor, 实际情况要看业务需求来放置，这个题目的话，都可以。
      this.timer = setInterval(() => {
        if (this.props.msg) {
          console.log('Clock3ClassComp 的 msg :>> ', this.props.msg);
        }

        this.setState({
          date: new Date()
        });
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "clock"
      }, /*#__PURE__*/React.createElement("p", null, "Clock3ClassComp \u5F53\u524D\u65F6\u95F4"), /*#__PURE__*/React.createElement("p", null, this.state.date.toLocaleTimeString()));
    }

  }

  const Wrap2 = /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'aquamarine'
    }
  }, /*#__PURE__*/React.createElement(Clock3ClassComp, {
    msg: "shenxi"
  }));
  ReactDOM.render(Wrap2, document.querySelector('#root2-compiler'));
  setTimeout(() => {
    // 当这里之后后，组件就卸载了，控制台的打印也结束了。因此，生命周期的意义就在于此。
    ReactDOM.render(null, document.querySelector('#root2-compiler'));
  }, 2000);
  /**
   * 其他关键点：
   * 根据官方文档的提示，这里也列出来：
   * 1. 组件中的 state ，只有在 constructor 中可以使用对象赋值，之后只能通过 React.Component 提供的 setState 函数赋值。
   * 
   * // Wrong
   * this.state.comment = 'Hello';
   * // Correct
   * this.setState({comment: 'Hello'});
   * 
   * 2. State 的更新可能是异步的。因此不要依赖他们的值来更新下一个状态。
   * // 假设当前 this.state.count = 10，
   * this.setState({
   *   otherCount: this.state.count + 10,
   * })
   * 
   * console.log(this.otherCount);  // 可能打印还是 10.
   * 
   * 之所以这样，是因为，state 和 props 的改变都是会触发视图，如果频繁的更改他们，势必持续触发Diff对比，从而更新视图。这不是个好事情。
   * 如果要使用他们的值来更新状态，如果处理？如下。
   * 
   * // Correct
   * this.setState({
   *   otherCount: this.state.count + 10,
   * })
   * this.setState((state, props) => ({
   *   otherCount2: this.state.otherCount + 20,
   * }));
   * 
   * 3. State 的更新会被合并
   * 
   * 4. 数据是向下流动的
   * 
   * TODO: 官方文档中有较多的提及，有状态组件/无状态组建 & 受控组件/不受控组件，以及组件中还可能会提及“纯”，之后再写。
   * 
   */
})(React);