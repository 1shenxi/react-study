/**
 * 六、列表渲染
 *  - Array.prototype.map
 *  - key
 */
((React) => {
  // 6.1 Array.prototype.map
  // jsx 其实就是可以在变量上承载 dom，因此，常用数组的map 方法，返回 dom元素即可。

  // 如下：渲染一个由上层决定终点的数字遍历，用<li /> 呈现。
  class ClassComponent extends React.Component {

    render() {
      const LiItems = [];
      for(let i = 1; i <= this.props.end; i++) {
        LiItems.push(<li>{ i }</li>)
      }
      // INFO: 由此可以看出，对于数组，在 `{}` 中会解析成 DOM 元素
      return (
        <ul>
          { LiItems }
        </ul>
      )
    }

  }
  ReactDOM.render(<ClassComponent end={ 10 }/>, document.querySelector('#root'))

  // 6.2 key
  // 通过把包换成了开发环境的包之后，上面的代码有报错。
  // `Warning: Each child in a list should have a unique "key" prop.`
  // 列表渲染建议使用key，不设置，默认使用列表的索引作为key。
  // INFO: 如果数据的顺序不会影响的话，可以使用索引，如果会，建议使用唯一的一个变量作为key。

  class ClassComponent1 extends React.Component {

    render() {
      const LiItems = [];
      for(let i = 1; i <= this.props.end; i++) {
        // 这里加了 key 之后，则不会报错。
        // INFO: 因此，key 这个属性就被占用了。如果有往下传递值的时候，请规避使用 key 传递，props.key 是拿不到的。
        LiItems.push(<li key={ i }>{ i }</li>)
      }
      // INFO: 由此可以看出，对于数组，在 `{}` 中会解析成 DOM 元素
      return (
        <ul>
          { LiItems }
        </ul>
      )
    }

  }
  ReactDOM.render(<ClassComponent1 end={ 7 }/>, document.querySelector('#root1'))

})(React);
