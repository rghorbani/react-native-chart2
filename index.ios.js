'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  requireNativeComponent,
  View,
  processColor,
} = React;

/** A native reference to the chart view */
var CHART_REF = 'chart';

/** The native chart view */
var RNChartView = requireNativeComponent('RNChartView', RNChart);

/** A base styles object that the user can override by passing in their own styles */
var styles = StyleSheet.create({
  base: {}
});

/** Our bridge component */
var RNChart = React.createClass({
  propTypes: {
    // TODO: define what these objects look like
    chartData: PropTypes.array.isRequired,
    xLabels: PropTypes.array.isRequired,
    animationDuration: PropTypes.number,
    showGrid: PropTypes.bool,
    verticalGridStep: PropTypes.number,
    gridColor: PropTypes.string,
    gridLineWidth: PropTypes.number,
    showAxis: PropTypes.bool,
    showXAxisLabels: PropTypes.bool,
    showYAxisLabels: PropTypes.bool,
    axisLineWidth: PropTypes.number,
    labelFontSize: PropTypes.number,
    labelTextColor: PropTypes.string
  },

  /** Pass the props to the native component */
  setNativeProps(props) {
    this.refs[CHART_REF].setNativeProps(props);
  },

  /** Render the native component with the correct props */
  render() {
    var style = [styles.base, this.props.style];
    var nativeProps = Object.assign({}, this.props);

    nativeProps.style = style;
    if (nativeProps.gridColor) {
      nativeProps.gridColor = processColor(nativeProps.gridColor);
    }
    if (nativeProps.labelTextColor) {
      nativeProps.labelTextColor = processColor(nativeProps.labelTextColor);
    }

    for (var i = 0; i < nativeProps.chartData.length; i++) {
      if (nativeProps.chartData[i].color)
        nativeProps.chartData[i].color = processColor(nativeProps.chartData[i].color);
      if (nativeProps.chartData[i].fillColor)
        nativeProps.chartData[i].fillColor = processColor(nativeProps.chartData[i].fillColor);
    };

    return <RNChartView ref={CHART_REF} {...nativeProps} />;
  }
});

module.exports = RNChart;