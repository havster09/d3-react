import d3 from 'd3';
import BaseChart from './BaseChart';

export default class PieChartCustom extends BaseChart {
  constructor(el, props) {
    super(el, props);
    this.formatPrice;
  }
  arcTween(a) {
    var interpolated = d3.interpolate(this.originalAngles, a);
    this.originalAngles = interpolated(0);

    return t => {
      return this.arc(interpolated(t));
    };
  }

  onMouseOver(d) {
    const value = this.formatPrice
      ? d3.format('$,')(d.data.value)
      : d.data.value;

    return this.tooltip
      .style('visibility', 'visible')
      .text(`${d.data.key.split('/').shift()} (${value})`);
  }

  addTooltips() {
    this.tooltip = d3
      .select(this.el)
      .append('div')
      .classed('d3act-tooltip', true)
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('border', '1px solid grey')
      .style('border-radius', '3px')
      .style('text-align', 'center')
      .style('padding', '8px 0')
      .style('width', '100px')
      .style('background-color', '#000')
      .style('color', '#FFF');
  }

  addLegend(data) {
    this.legend = this.svg
      .selectAll('.d3act-legend')
      .data(this.color.domain())
      .enter()
      .append('g')
      .attr('class', 'd3act-legend')
      .attr('transform', (d, i) => {
        const height = this.legendRectSize + this.legendSpacing;
        const offset = 20;
        const horz = -10 * this.legendRectSize;
        const vert = this.props.height / 2 + i * height + offset;

        return 'translate(' + horz + ',' + vert + ')';
      });

    this.legend
      .append('rect')
      .attr('width', this.legendRectSize)
      .attr('height', this.legendRectSize)
      .style('fill', this.color)
      .style('stroke', this.color);

    this.legend
      .append('text')
      .attr('x', this.legendRectSize + this.legendSpacing)
      .attr('y', this.legendRectSize - this.legendSpacing)
      .text(d => {
        const name = Object.keys(data)[d];
        const value = data.formatPrice
        ? d3.format('$,')(data[name])
        : data[name];
        return `${name} (${value})`;
      });
  }

  getHeight(numberOfItems) {
    if (this.showLegend) {
      const legendRectExtraHeight = numberOfItems * this.legendRectSize;
      const legendSpacingExtraHeight = numberOfItems * this.legendSpacing;

      return (
        this.props.height * 1.5 +
        legendSpacingExtraHeight +
        legendRectExtraHeight
      );
    }

    return this.props.height;
  }

  create(data) {
    this.legendRectSize = 18;
    this.legendSpacing = 4;
    this.data = data;

    const numberOfItems = Object.keys(data).length;

    const width = this.props.width;
    const height = this.props.height;
    const svgHeight = this.getHeight(numberOfItems);
    const radius = Math.min(width, height) / 2;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.arc = d3.svg
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(this.props.innerRadius);

    this.pie = d3.layout.pie().sort(null).value(d => {
      return d.value;
    });

    this.svg = d3
      .select(this.el)
      .append('svg')
      .attr('width', width)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${halfWidth}, ${halfHeight})`);

    this.path = this.svg
      .selectAll('path')
      .data(this.pie(d3.entries(data)))
      .enter()
      .append('path');

    this.path
      .attr('fill', (d, i) => {
        return this.color(i);
      })
      .attr('d', this.arc)
      .each(d => {
        this.originalAngles = d;
      })
      .on('mouseover', this.onMouseOver.bind(this))
      .on('mousemove', this.onMouseMove.bind(this))
      .on('mouseout', this.onMouseOut.bind(this));

    if (this.showTooltips) {
      this.addTooltips();
    }

    if (this.showLegend) {
      this.addLegend(data);
    }
  }

  update(data) {
    this.formatPrice = data.formatPrice;
    this.path
      .data(this.pie(d3.entries(data)))
      .transition()
      .duration(this.transitionDuration)
      .attrTween('d', this.arcTween.bind(this));

    this.path
      .data(this.pie(d3.entries(data)))
      .enter()
      .append('path')
      .attr('fill', (d, i) => {
        return this.color(i);
      })
      .attr('d', this.arc)
      .each(d => {
        this.originalAngles = d;
      })
      .on('mouseover', this.onMouseOver.bind(this))
      .on('mousemove', this.onMouseMove.bind(this))
      .on('mouseout', this.onMouseOut.bind(this));

    if (this.showLegend) {
      this.legend.selectAll('text').remove();
      this.legend
        .append('text')
        .attr('x', this.legendRectSize + this.legendSpacing)
        .attr('y', this.legendRectSize - this.legendSpacing)
        .text(d => {
          const name = Object.keys(data)[d];
          const value = data.formatPrice
            ? d3.format('$,')(data[name])
            : data[name];

          return `${name} (${value})`;
        });
    }
  }
}
