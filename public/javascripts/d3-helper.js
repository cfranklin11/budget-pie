'use strict';

var bbApp = bbApp || {};

bbApp.D3Helper = {
  createCircleChart: function (data) {

    var title, w, h, percentage, svg, outerR, innerR, centerX, centerY,
      percentageString, labelSize, outerColor, innerColor, labelColor;

    title = data.title;
    title = title.replace(/\s/g, '-').replace(/,/g, '');
    w = 90;
    h = 100;
    percentage = data.budgetPercent;

    svg = d3.select('#' + title + '-1')
      .append('svg')
      .attr('width', w.toFixed() + '%')
      .attr('height', h.toFixed() + '%')
      .attr('viewBox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('id', 'circle');

    outerR = h / 2;
    innerR = outerR * percentage;
    centerX = w / 2;
    centerY = h / 2;
    percentageString = (percentage * 100).toFixed(1);
    labelSize = 1;
    outerColor = '#9d2235';
    innerColor = '#FEB01A';
    labelColor = '#fafafa';

    // Create background circle (total budget value)
    svg.append('circle')
      .attr('cx', centerX.toFixed() + '%')
      .attr('cy', centerY.toFixed() + '%')
      .attr('r', outerR.toFixed() + '%')
      .attr('fill', outerColor);

    // Create interior circle (this budget item's value)
    svg.append('circle')
      .attr('cx', centerX.toFixed() + '%')
      .attr('cy', centerY.toFixed() + '%')
      .attr('r', innerR.toFixed() + '%')
      .attr('fill', innerColor);

    svg.append('text')
      .attr('x', (centerX + 5).toFixed() + '%')
      .attr('y', (centerY - innerR - labelSize * 2).toFixed() + '%')
      .attr('text-anchor', 'middle')
      .attr('font-size', labelSize.toFixed() + 'em')
      .attr('fill', labelColor)
      .text(percentageString + '%');
 },
  createBarChart: function (data) {
    var title, w, h, padding, fontSize, labelSize, barColor, labelColor, years, count,
      totalLastYear, totalThisYear, minTotal, maxTotal, chartData, totalChange,
      percentChange, barWidth, yScale, yAxisScale, svg, bars,
      label1, label2, label3, label4;

    w = 100;
    h = 100;
    padding = 10;
    fontSize = 10;
    labelSize = 1;
    barColor = '#000000';
    labelColor = '#000000';
    years = ['This Year (2015/2016)', 'Last Year (2014/2015)'];
    count = years.length;
    title = data.title;
    title = title.replace(/\s/g, '-').replace(/,/g, '');
    totalLastYear = +data.dollarsLastYear;
    totalThisYear = +data.dollarsThisYear;
    minTotal = Math.min(totalLastYear, totalThisYear);
    maxTotal = Math.max(totalLastYear, totalThisYear);
    chartData = [totalLastYear, totalThisYear];
    totalChange = totalThisYear - totalLastYear;
    percentChange = totalThisYear / totalLastYear - 1;

    barWidth = w / count;

    yScale = d3.scale.linear()
      .domain([minTotal, maxTotal])
      .range([((h - padding) * (minTotal / maxTotal) * 0.9), (h - padding) * 0.9]);
    yAxisScale = d3.scale.linear()
      .domain([0, maxTotal])
      .range([h - padding, padding]);

    svg = d3.select('#' + title + '-2')
      .append('svg')
      .attr('width', w.toFixed())
      .attr('height', h.toFixed())
      .attr('viewBox', '0 0 ' + w.toFixed() + ' ' + h.toFixed())
      .attr('preserveAspectRatio', 'xMinYMin meet');

    bars = svg.selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect');
    bars.attr('x', function (d, i) {return (i * barWidth * 1.1);})
      .attr('y', function (d) {return h - yScale(d) - padding;})
      .attr('width', barWidth * 0.9)
      .attr('height', function (d) {return (yScale(d) - padding);})
      .attr('fill', '#ec971f');

    label1 = svg.append('text')
      .attr('x', barWidth * 0.9 * 0.5)
      .attr('y', h - padding)
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize)
      .text('Last Year');
    label2 = svg.append('text')
      .attr('x', barWidth * 1.1 + barWidth * 0.9 * 0.5)
      .attr('y', h - padding)
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize)
      .text('This Year');

    label3 = svg.append('text')
      .attr('x', barWidth * 0.9 * 0.5)
      .attr('y', h - yScale(totalLastYear) - padding + (yScale(totalLastYear) -
        padding) * 0.5)
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize);
    label3.append('tspan')
      .attr('x', barWidth * 0.9 * 0.5)
      .attr('dy', 0)
      .text('$' + (totalLastYear / 1000000).toFixed(1));
    label3.append('tspan')
      .attr('x', barWidth * 0.9 * 0.5)
      .attr('dy', fontSize)
      .text('mil');

    label4 = svg.append('text')
      .attr('x', barWidth * 1.1 + barWidth * 0.9 * 0.5)
      .attr('y', h - yScale(totalThisYear) - padding + (yScale(totalThisYear) -
        padding) * 0.5)
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize);
    label4.append('tspan')
      .attr('x', barWidth * 1.1 + barWidth * 0.9 * 0.5)
      .attr('dy', 0)
      .text('$' + (totalThisYear / 1000000).toFixed(1));
    label4.append('tspan')
      .attr('x', barWidth * 1.1 + barWidth * 0.9 * 0.5)
      .attr('dy', fontSize)
      .text('mil');
   }
};
