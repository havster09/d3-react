import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    padding: 20
  }
};

class SmInput extends React.Component {
  constructor(props) {
    super(props);
    this.smMethod = this.smMethod.bind(this);
    this.state = {
      say: 'fu'
    };
  }

  smMethod() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ say: 'u2' });
    }, 1000);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class Stringifier extends React.Component {
  static displayName = `Stringifier`;
  constructor(props) {
    super(props);
    this.smMethod = this.smMethod.bind(this);
    this.state = {
      say: 'fu'
    };
  }

  smMethod() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ say: 'u2', value: 'whoever' });
    }, 1000);
  }

  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.props)}
        </pre>
        <input type="text" value={this.state.value} />
        <p>
          {this.state.say}
        </p>
      </div>
    );
  }
}

function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const iiHoc = WrappedComponent => {
  return class Enhancer extends WrappedComponent {
    static displayName = `IIHOC(${getDisplayName(WrappedComponent)})`;
    constructor(props) {
      super(props);
      this.state = {
        value: 'vr mk'
      };
    }

    handleChange = event => {
      this.setState({ value: event.target.value });
    };
    // render hijacking
    // conditional rendering
    render() {
      if (this.props.smNum === 50) {
        return super.render();
      } else if (this.props.smNum === 75) {
        // modify tree output by render
        const elementsTree = super.render();
        let newProps = {};
        if (elementsTree) {
          newProps = { value: this.state.value, onChange: this.handleChange };
        }
        const props = Object.assign({}, elementsTree.props, newProps);
        const newElementsTree = React.cloneElement(
          elementsTree,
          props,
          elementsTree.props.children
        );
        return newElementsTree;
      }

      return (
        <div>
          <p>not greater than 50</p>
          <h2>HOC Debugger Component</h2>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      );
    }
    componentDidMount() {
      super.smMethod(); // call wrapped components methods
    }
  };
};

const HocStringifier = iiHoc(Stringifier);
const HocInput = iiHoc(SmInput);

const HocFac = params => WrappedComponent => {
  return class HocWithParams extends React.Component {
    static displayName = `HocWithParams(${getDisplayName(WrappedComponent)})`;
    constructor(props) {
      super(props);
      this.handleInvokeParamMethod = this.handleInvokeParamMethod.bind(this);
    }
    handleInvokeParamMethod() {
      params.method();
    }
    componentDidMount() {
      params.method();
    }
    render() {
      return (
        <div>
          <WrappedComponent value={params.value} />
          <button onClick={this.handleInvokeParamMethod}>Invoke</button>
        </div>
      );
    }
  };
};

const HocFacExample = HocFac({value: 'ey', method: () => {console.log(`gonna dog u`)}})(SmInput); //instead of string can add method

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.handleForceUpdate = this.handleForceUpdate.bind(this);
  }
  handleForceUpdate() {
    this.forceUpdate();
  }
  render() {
    const mutatedChildren = this.props.children.map((child,i) => {
      const mutantChild = React.cloneElement(
        child,
        { key: i,style: { fontSize: Math.ceil(Math.random() * 20 + 10) } },
        Math.random() * 20
      );
      return mutantChild;
    });
    return (
      <div>
        {mutatedChildren}
        <button onClick={this.handleForceUpdate}>Render</button>
      </div>
    );
  }
}

const HocIi = props =>
  <div>
    <Paper zDepth={1} style={styles.paper}>
      <HocFacExample />
      <hr />
      <h1>Hoc</h1>
      <HocStringifier smNum={50} />
      <HocInput smNum={75} />
      <HocStringifier smNum={100} />
      <Parent>
        <p>fun in the s</p>
        <p>fun in the s</p>
        <p>fun in the s</p>
        <p>fun in the s</p>
        <p>fun in the s</p>
      </Parent>
    </Paper>
  </div>;

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, null)(HocIi);
