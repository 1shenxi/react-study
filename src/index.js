/**
 * 五、条件渲染&列表渲染
 */
((React) => {
  /**
   * 5.1 条件渲染
   *  - if
   *  - &&
   *  - 三目运算符
   */
    
   class ClassComponent extends React.Component {
     render() {
       // 5.1.1 通过控制返回
       if(this.props.isOpen) {
         return <div>现在是开着的VVVVV</div>
       }
       return <div>现在是关着的XXXXX</div>
     }
   }
   // 通过 isOpen 控制。
   ReactDOM.render(<ClassComponent isOpen={true} />, document.querySelector('#root'))

   // 5.1.2 变量承载jsx
   class ClassComponent1 extends React.Component {
    render() {
      let showText = null;
      // 5.1.1 通过控制返回
      if(this.props.isOpen) {
        showText = <div>现在是开着的VVVVV</div>
      } else {
        showText = <div>现在是关着的XXXXX</div>
      }
      return (
        <div>
          <hr />
          <p>我是ClassComponent1</p>
          { showText }
        </div>
      )
    }
  }
  ReactDOM.render(<ClassComponent1 isOpen={false} />, document.querySelector('#root1'))

  // 5.2 &&
  // 如果 isOpen 为 true 才会展示，否则不展示。
  class ClassComponent2 extends React.Component {
    render() {
      return (
        <div>
          <hr />
          <p>我是ClassComponent2</p>
          { this.props.isOpen && <div>现在是开着的VVVVV</div> }
        </div>
      )
    }
  }
  ReactDOM.render(<ClassComponent2 isOpen={true} />, document.querySelector('#root2'))

  // 5.3 三目运算符
  class ClassComponent3 extends React.Component {
    render() {
      return (
        <div>
          <hr />
          <p>我是ClassComponent3</p>
          { this.props.isOpen ? <div>现在是开着的VVVVV</div> : <div>现在是关着的XXXXX</div> }
        </div>
      )
    }
  }
  ReactDOM.render(<ClassComponent3 isOpen={true} />, document.querySelector('#root3'))

})(React);
