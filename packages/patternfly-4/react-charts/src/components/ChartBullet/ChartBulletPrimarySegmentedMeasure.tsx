import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  DataGetterPropType,
  DomainPropType,
  NumberOrCallback,
  PaddingProps,
  VictoryBar,
} from 'victory';
import { Data } from 'victory-core';
import { ChartBar } from '../ChartBar';
import { ChartContainer } from '../ChartContainer';
import { ChartBulletStyles, ChartThemeDefinition } from '../ChartTheme';
import { ChartTooltip } from '../ChartTooltip';
import { getBulletPrimaryNegativeMeasureTheme, getBulletPrimarySegmentedMeasureTheme } from '../ChartUtils';
import { ChartBulletComparativeMeasure } from "./ChartBulletComparativeMeasure";

/**
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/victory/index.d.ts
 */
export interface ChartBulletPrimarySegmentedMeasureProps {
  /**
   * The ariaDesc prop specifies the description of the chart/SVG to assist with
   * accessibility for screen readers.
   *
   * Note: Overridden by the desc prop of containerComponent
   */
  ariaDesc?: string;
  /**
   * The ariaTitle prop specifies the title to be applied to the SVG to assist
   * accessibility for screen readers.
   *
   * Note: Overridden by the title prop of containerComponent
   */
  ariaTitle?: string;
  /**
   * The barWidth prop is used to specify the width of each bar. This prop may be given as
   * a number of pixels or as a function that returns a number. When this prop is given as
   * a function, it will be evaluated with the arguments datum, and active. When this value
   * is not given, a default value will be calculated based on the overall dimensions of
   * the chart, and the number of bars.
   */
  barWidth?: NumberOrCallback;
  /**
   * The comparative measure warning component to render with the chart
   */
  comparativeZeroMeasureComponent?: React.ReactElement<any>;
  /**
   * The data prop specifies the data to be plotted. Data should be in the form of an array
   * of data points, or an array of arrays of data points for multiple datasets.
   * Each data point may be any format you wish (depending on the `comparativeErrorMeasureDataY` accessor prop),
   * but by default, an object with y properties is expected.
   *
   * @example data={[{ y: 50 }]}
   */
  data?: any[];
  /**
   * The domain prop describes the range of values your chart will cover. This prop can be
   * given as a array of the minimum and maximum expected values for your bar chart,
   * or as an object that specifies separate arrays for x and y.
   * If this prop is not provided, a domain will be calculated from data, or other
   * available information.
   * @example {x: [0, 2], y: [0, 100]}
   *
   * Note: The x domain is expected to be `x: [0, 2]` in order to position all measures properly
   */
  domain?: DomainPropType;
  /**
   * The height props specifies the height the svg viewBox of the chart container.
   * This value should be given as a number of pixels
   */
  height?: number;
  /**
   * The horizontal prop determines whether the bars will be laid vertically or
   * horizontally. The bars will be vertical if this prop is false or unspecified,
   * or horizontal if the prop is set to true.
   */
  horizontal?: boolean;
  /**
   * Invert the color scales used to represent primary segmented measures.
   */
  invert?: boolean;
  /**
   * The labelComponent prop takes in an entire label component which will be used
   * to create a label for the bar. The new element created from the passed labelComponent
   * will be supplied with the following properties: x, y, index, data, verticalAnchor,
   * textAnchor, angle, style, text, and events. any of these props may be overridden
   * by passing in props to the supplied component, or modified or ignored within
   * the custom component itself. If labelComponent is omitted, a new ChartLabel
   * will be created with props described above. This labelComponent prop should be used to
   * provide a series label for ChartBar. If individual labels are required for each
   * data point, they should be created by composing ChartBar with VictoryScatter
   */
  labelComponent?: React.ReactElement<any>;
  /**
   * The labels prop defines labels that will appear above each bar in your chart.
   * This prop should be given as an array of values or as a function of data.
   * If given as an array, the number of elements in the array should be equal to
   * the length of the data array. Labels may also be added directly to the data object
   * like data={[{y: 1, label: "first"}]}.
   * @example ["spring", "summer", "fall", "winter"], (datum) => datum.title
   */
  labels?: string[] | ((data: any) => string);
  /**
   * The measureComponent prop takes an entire component which will be used to create the chart
   */
  measureComponent?: React.ReactElement<any>;
  /**
   * The theme prop takes a style object with nested data, labels, and parent objects.
   * You can create this object yourself, or you can use a theme provided by
   * When using ChartBar as a solo component, implement the theme directly on
   * ChartBar. If you are wrapping ChartBar in ChartChart or ChartGroup,
   * please call the theme on the outermost wrapper component instead.
   */
  negativeMeasureTheme?: ChartThemeDefinition;
  /**
   * The padding props specifies the amount of padding in number of pixels between
   * the edge of the chart and any rendered child components. This prop can be given
   * as a number or as an object with padding specified for top, bottom, left
   * and right.
   */
  padding?: PaddingProps;
  /**
   * The standalone prop determines whether the component will render a standalone svg
   * or a <g> tag that will be included in an external svg. Set standalone to false to
   * compose ChartBar with other components within an enclosing <svg> tag.
   */
  standalone?: boolean;
  /**
   * The theme prop takes a style object with nested data, labels, and parent objects.
   * You can create this object yourself, or you can use a theme provided by
   * When using ChartBar as a solo component, implement the theme directly on
   * ChartBar. If you are wrapping ChartBar in ChartChart or ChartGroup,
   * please call the theme on the outermost wrapper component instead.
   */
  theme?: ChartThemeDefinition;
  /**
   * Specifies the theme color. Valid values are 'blue', 'green', 'grey' (recomended), 'multi', etc.
   *
   * Note: Not compatible with theme prop
   *
   * @example themeColor={ChartThemeColor.blue}
   */
  themeColor?: string;
  /**
   * Specifies the theme variant. Valid values are 'dark' or 'light'
   *
   * Note: Not compatible with theme prop
   *
   * @example themeVariant={ChartThemeVariant.light}
   */
  themeVariant?: string;
  /**
   * The width props specifies the width of the svg viewBox of the chart container
   * This value should be given as a number of pixels
   */
  width?: number;
  /**
   * The y prop specifies how to access the Y value of each data point.
   * If given as a function, it will be run on each data point, and returned value will be used.
   * If given as an integer, it will be used as an array index for array-type data points.
   * If given as a string, it will be used as a property key for object-type data points.
   * If given as an array of strings, or a string containing dots or brackets,
   * it will be used as a nested object property path (for details see Lodash docs for _.get).
   * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
   * @example 0, 'y', 'y.value.nested.1.thing', 'y[2].also.nested', null, d => Math.sin(d)
   */
  y?: DataGetterPropType;
  /**
   * Use y0 data accessor prop to determine how the component defines the baseline y0 data.
   * This prop is useful for defining custom baselines for components like ChartBar.
   * This prop may be given in a variety of formats.
   * @example 'last_quarter_profit', () => 10, 1, 'employees.salary', ["employees", "salary"]
   */
  y0?: DataGetterPropType;
}

interface ChartBulletPrimarySegmentedMeasureDataInterface {
  data?: any[];
  invert?: boolean;
  negativeMeasureTheme?: ChartThemeDefinition,
  theme?: ChartThemeDefinition,
  themeColor?: string;
  themeVariant?: string;
  y?: DataGetterPropType;
  y0?: DataGetterPropType;
}

export const getPrimarySegmentedMeasureData = ({
  data,
  invert,
  themeColor,
  themeVariant,

  // destructure last
  theme = getBulletPrimarySegmentedMeasureTheme(themeColor, themeVariant),
  negativeMeasureTheme = getBulletPrimaryNegativeMeasureTheme(themeColor, themeVariant),
  y,
  y0
}: ChartBulletPrimarySegmentedMeasureDataInterface) => {
  const negativeDatum: any[] = [];
  const positiveDatum: any[] = [];

  Data.formatData(data, {y, y0}, ['y', 'y0']).forEach(((dataPoint: any, index: number) => {
    if (dataPoint._y < 0) {
      negativeDatum.push({
        ...dataPoint,
        _index: index // Save to sync legend color
      });
    } else {
      positiveDatum.push({
        ...dataPoint,
        _index: index // Save to sync legend color
      });
    }
  }));

  // Instead of relying on colorScale, colors must be added to each measure in ascending order
  const negativeComputedData = negativeDatum.sort((a: any, b: any) => b._y - a._y).
    map((dataPoint: any, index: number) => {
      return {
        ...dataPoint,
        x: 1,
        _x: 1,
        _color: invert
          ? theme.group.colorScale[index % theme.group.colorScale.length]
          : negativeMeasureTheme.group.colorScale[index % theme.group.colorScale.length]
      };
      // Sort descending so largest bar is appears behind others
    }).sort((a: any, b: any) => a._y - b._y);

  // Instead of relying on colorScale, colors must be added to each measure in ascending order
  const positiveComputedData = positiveDatum.sort((a: any, b: any) => a._y - b._y).
    map((dataPoint: any, index: number) => {
      return {
        ...dataPoint,
        x: 1,
        _x: 1,
        _color: invert
          ? negativeMeasureTheme.group.colorScale[index % theme.group.colorScale.length]
          : theme.group.colorScale[index % theme.group.colorScale.length]
      };
      // Sort descending so largest bar is appears behind others
    }).sort((a: any, b: any) => b._y - a._y);

  return [
    ...negativeComputedData,
    ...positiveComputedData
  ];
};

let currentId = 0;

export const ChartBulletPrimarySegmentedMeasure: React.FunctionComponent<ChartBulletPrimarySegmentedMeasureProps> = ({
  ariaDesc,
  ariaTitle,
  barWidth = ChartBulletStyles.primarySegmentedMeasureWidth,
  comparativeZeroMeasureComponent = <ChartBulletComparativeMeasure />,
  data,
  domain,
  horizontal = true,
  invert = false,
  labels,
  measureComponent = <ChartBar />,
  padding,
  standalone = true,
  themeColor,
  themeVariant,
  y,
  y0,

  // destructure last
  theme = getBulletPrimarySegmentedMeasureTheme(themeColor, themeVariant),
  negativeMeasureTheme = getBulletPrimaryNegativeMeasureTheme(themeColor, themeVariant),
  labelComponent =
    <ChartTooltip
      orientation="top"
      dx={datum => {
        if (horizontal) {
          return datum._y > 0 ? -10 : 10
        }
        const result = (typeof barWidth === 'function') ? barWidth(data, false) : barWidth;
        return result / 2;
      }}
      dy={datum => {
        if (!horizontal) {
          return datum._y > 0 ? -10 : 10
        }
        const result = (typeof barWidth === 'function') ? barWidth(data, false) : barWidth;
        return result / 2;
      }}
    />,
  height = theme.group.height,
  width = theme.group.width,
  ...rest
}: ChartBulletPrimarySegmentedMeasureProps) => {
  const computedData = getPrimarySegmentedMeasureData({
    data,
    invert,
    negativeMeasureTheme,
    theme,
    y,
    y0
  });

  const measure = computedData.map((dataPoint: any) => {
    const key = `pf-primary-segmented-measure-${currentId++}`;
    return React.cloneElement(measureComponent, {
      barWidth,
      data: [{...dataPoint}],
      domain,
      height,
      horizontal,
      key,
      labelComponent,
      labels,
      padding,
      standalone: false,
      style: {
        data: {
          fill: dataPoint._color
        }
      },
      theme,
      width,
      ...measureComponent.props
    });
  });

  const getComparativeZeroMeasure = () => {
    if (!domain) {
      return null;
    }
    const domainProp: any = domain;
    const low = Array.isArray(domainProp)
      ? domainProp[0]
      : domainProp.y && Array.isArray(domainProp.y) ? domainProp.y[0] : 0;
    const high = Array.isArray(domainProp)
      ? domainProp[domainProp.length - 1]
      : domainProp.y && Array.isArray(domainProp.y) ? domainProp.y[domainProp.y.length - 1] : 0;

    if (low < 0 && high > 0) {
      return React.cloneElement(comparativeZeroMeasureComponent, {
        data: [{y: 0}],
        domain,
        height,
        horizontal,
        padding,
        standalone: false,
        width,
        ...comparativeZeroMeasureComponent.props
      });
    }
    return null;
  };

  return standalone ? (
    <ChartContainer desc={ariaDesc} height={height} title={ariaTitle} width={width}>
      {measure}
      {getComparativeZeroMeasure()}
    </ChartContainer>
  ) : (
    <React.Fragment>
      {measure}
      {getComparativeZeroMeasure()}
    </React.Fragment>
  );
};

// Note: VictoryBar.role must be hoisted
hoistNonReactStatics(ChartBulletPrimarySegmentedMeasure, VictoryBar);
