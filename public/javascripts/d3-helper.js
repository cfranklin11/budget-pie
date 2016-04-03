'use strict';

var bbApp = bbApp || {};

bbApp.D3Helper = {
  createCircleChart: function (data) {

    var title, w, h, percentage, svg, outerR, innerR, centerX, centerY,
      percentageString, labelSize, outerColor, innerColor, labelColor;



    title = data.title;
    title = title.replace(/\s/g, '-');
    w = 90;
    h = 100;
    percentage = data.budgetPercent;

    svg = d3.select('#' + title)
      .append('svg')
      .attr('width', w.toFixed() + '%')
      .attr('height', h.toFixed() + '%')
      .attr('viewBox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin meet');

      console.log(svg);

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
      .attr('x', centerX.toFixed() + '%')
      .attr('y', (centerY - labelSize * 5).toFixed() + '%')
      .attr('text-anchor', 'middle')
      .attr('font-size', labelSize.toFixed() + 'em')
      .attr('fill', labelColor)
      .text(percentageString + '%');
  }
};
