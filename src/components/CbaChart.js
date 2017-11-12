import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PieChartCustom from './PieChartCustom';
import Chart from './Chart';

const styles = {
  toggleContainer: {
    maxWidth: 200
  },
  toggle: {
    marginBottom: 16
  }
};

class CbaChart extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateChartYear = this.handleUpdateChartYear.bind(this);
    this.handleUpdateChartType = this.handleUpdateChartType.bind(this);
    this.handleSynchChart = this.handleSynchChart.bind(this);
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.handleSynchChart(this.props);
    };
    this.handleSynchChart(this.props);
  }

  handleSynchChart(props) {
    if (props.match.params.chartYear) {
      if (props.match.params.chartYear !== this.props.chartYear) {
        this.props.synchChart(props.match.params.chartYear);
      }
    }
  }

  handleUpdateChartYear(event, index, value) {
    this.props.onUpdateChartYear(value);
  }

  handleUpdateChartType(event, isInputChecked) {
    const chartType = isInputChecked ? 'face' : 'pn';
    this.props.onUpdateChartType(chartType);
  }

  render() {
    const labelValue =
      this.props.chartType === 'pn' ? 'face' : this.props.chartType;

    let totalArray = [];

    // need Object.values polyfill for jest
    for(const key in this.props.data[this.props.chartType]) {
      totalArray.push(this.props.data[this.props.chartType][key]);
    }

    let totalValue = totalArray
      .filter(val => typeof val === 'number')
      .reduce((a, b) => a + b);

    if (this.props.chartType === 'face') {
      totalValue = '$' + totalValue.toLocaleString();
    }

    return (
      <div>
        <h1>
          Infringements {this.props.chartYear}
        </h1>
        <h2>
          Total: {totalValue}
        </h2>
        <div style={styles.toggleContainer}>
          <Toggle
            onToggle={this.handleUpdateChartType}
            defaultToggled={this.props.chartType === 'face'}
            label={`Show ${labelValue} value`}
            style={styles.toggle}
          />
        </div>
        <SelectField
          floatingLabelText="Year"
          value={this.props.chartYear}
          onChange={this.handleUpdateChartYear}
        >
          <MenuItem value="2013" primaryText="2013" />
          <MenuItem value="2014" primaryText="2014" />
        </SelectField>

        <Chart
          type={'custom'}
          customChart={PieChartCustom}
          width={400}
          height={400}
          showTooltips={true}
          showLegend={true}
          chartType={this.props.chartType}
          data={this.props.data[this.props.chartType]}
        />
      </div>
    );
  }
}

export default CbaChart;
