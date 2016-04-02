'use strict';

var bbApp = bbApp || {};

bbApp.D3Helper = {
  createCircleChart: function (data) {

    var title, w, h, percentage, svg, outerR, innerR, centerX, centerY,
      percentageString, labelSize, outerColor, innerColor, labelColor;

    console.log(data);

    title = data.title;
    w = 90;
    h = 100;
    percentage = data.budgetPercent;

    svg = d3.select('#' + title)
      .append('svg')
      .attr('width', w.toFixed(0) + '%')
      .attr('height', h.toFixed(0) + '%')
      .attr('viewBox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin meet');

      outerR = h / 2;
      innerR = outerR * percentage;
      centerX = w / 2;
      centerY = h / 2;
      percentageString = (percentage * 100).toFixed(1);
      labelSize = 1;
      outerColor = '#000000';
      innerColor = '#FFFFFF';
      labelColor = '#00FF00';

    // Create background circle (total budget value)
    svg.append('circle')
      .attr('cx', centerX.toFixed(0) + '%')
      .attr('cy', centerY.toFixed(0) + '%')
      .attr('r', outerR.toFixed(0) + '%')
      .attr('fill', outerColor);

    // Create interior circle (this budget item's value)
    svg.append('circle')
      .attr('cx', centerX.toFixed(0) + '%')
      .attr('cy', centerY.toFixed(0) + '%')
      .attr('r', innerR.toFixed(0) + '%')
      .attr('fill', innerColor);

    svg.append('text')
      .attr('x', centerX.toFixed(0) + '%')
      .attr('y', (centerY - labelSize * 5).toFixed(0) + '%')
      .attr('text-anchor', 'middle')
      .attr('font-size', labelSize.toFixed(0) + 'em')
      .attr('fill', labelColor)
      .text(percentageString + '%');
  }
};