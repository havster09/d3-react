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
    }
  }

  smMethod() {
    setTimeout(() => {
      this.setState({say: 'u2'});
    }, 1000)
  }

  render() {
    return (
     <div>
      <pre>
        {JSON.stringify(this.props)}
      </pre>
       <p>{this.state.say}</p>
     </div>
    );
  }
}

const ppHoc = WrappedComponent => {
  return class PP extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.smMethod(); // call child methods by ref
    }
    render() {
      // add extra props
      const commonProps = {
        common: 'shit',
        unique: Math.ceil(Math.random() * 1000)
      };

      const props = Object.assign({}, this.props, commonProps, {
        ref: this.proc.bind(this) // call child methods by ref
      });

      return <WrappedComponent {...props} />;
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
