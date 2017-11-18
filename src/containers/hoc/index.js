import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    padding: 20
  }
};

class Stringifier extends React.Component {
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
      <div>
        <pre>
          {JSON.stringify(this.props)}
        </pre>
        <p>
          {this.state.say}
        </p>
        <input
          name="name"
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

const ppHoc = WrappedComponent => {
  return class PP extends React.Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.state = { name: 'lindzey' };
    }

    proc(wrappedComponentInstance) {
      wrappedComponentInstance.smMethod(); // call child methods by ref
    }

    handleNameChange(event) {
      this.setState({
        name: event.target.value
      });
    }

    render() {
      // add extra props
      const commonProps = {
        common: 'shit',
        unique: Math.ceil(Math.random() * 1000)
      };

      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.handleNameChange
        }
      };

      const props = Object.assign(
        {},
        this.props,
        commonProps,
        newProps.name,
        {
          // ref: this.proc.bind(this) // call child methods by ref, breaks after onChange
        }
      );

      return (
       // add common layout
       <ul>
         <li>
           <WrappedComponent {...props} />
         </li>
       </ul>
      );
    }
  };
};

const HocStringifier = ppHoc(Stringifier);

const Hoc = props =>
  <div>
    <Paper zDepth={1} style={styles.paper}>
      <h1>Hoc</h1>
      <HocStringifier smNum={50} />
      <HocStringifier test={100} />
    </Paper>
  </div>;

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, null)(Hoc);
