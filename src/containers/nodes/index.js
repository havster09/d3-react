import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { addNode } from '../../reducers/nodesReducer';

const styles = {
  paper: {
    padding: 20
  }
};

const DummyLi = (props) => <li>{JSON.stringify(props.children)}</li>;

class Spawner extends React.Component {
  static displayName = `Spawner`;
  static contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
  constructor(props, context) {
    super(props, context);
    this.instantiatedEls = [];
    this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this);
  }
  handleOnClickAdd() {
    this.props.addNode(1);
  }
  handleOnClickRemove() {
    this.props.addNode(-1);
  }
  createMarkup(props) {
    if(props.spawnNumber < 5) {
      return {__html: `<p>under 5</p><p>total ${props.spawnNumber}</p>`};
    }
    return {__html: `<p>over 5</p>`};
  }
  render() {
    this.instantiatedEls = [];
    for(let i = 0; i < this.props.spawnNumber; i++) {
      const created = React.createElement(
        DummyLi,
        {key:i},
        i,
      );
      if(React.isValidElement(created)) {
        this.instantiatedEls.push(created);
      }
    }

    const spawned = React.createElement(
      'ul', {
        className: 'myList'
      },
      this.instantiatedEls
    );

    return (
      <div>
        <button onClick={this.handleOnClickAdd}>Instantiate</button>
        <button onClick={this.handleOnClickRemove}>Kill</button>
        <div dangerouslySetInnerHTML={this.createMarkup(this.props)} />
        {spawned}
        <pre>
        {JSON.stringify(this.context, null, 4 )}
      </pre>
        <pre>
        {JSON.stringify(this.props, null, 4 )}
      </pre>
      </div>


    );
  }
}

const mapStateToProps = state => {
  return state['nodes']
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNode,
    },
    dispatch
  );

const WrappedSpawner = connect(mapStateToProps, mapDispatchToProps)(Spawner);

const Nodes = props =>
  <div>
    <Paper zDepth={1} style={styles.paper}>
      <h1>Nodes</h1>
      <WrappedSpawner />
    </Paper>
  </div>;

export default connect(mapStateToProps, null)(Nodes);
