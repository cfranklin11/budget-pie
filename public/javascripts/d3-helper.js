'use strict';

var bbApp = bbApp || {};

bbApp.D3Helper = {
  //Create pie chart for 'live' performance views
  createCircleChart: function ( data ) {

    var title, w, h, percentage, svg, outerR, innerR;

      title = data.title;
      w = 1000;
      h = 800;
      percentage = data.budgetPercent;

    svg = d3.select( '#' + title );
      .append( 'svg' );
      .attr( 'width', w );
      .attr( 'height', h );
      .attr( 'viewBox', '0 0 ' + w + ' ' + h );
      .attr( 'preserveAspectRatio', 'xMinYMin meet' );

      outerR = d3.min([ h, w ]);
      innerR = outerR * percentage;
      midR = outerR * 0.9,
      cx = w / 2,
      cy = h / 2,
      percentage = metricSum / metricTarget,
      percentageString = ( percentage * 100 ).toFixed( 1 ),
      angle = percentage * 2 * Math.PI,
      xCoord = Math.sin( angle ),
      yCoord = Math.cos( angle ),
      labelSize = 96,
      circleColor, pathColor;

    // If metric >= 100% of target, main circle a shade darker,
    // and path is one more shade darker
    if ( angle < 2 * Math.PI ) {
      circleColor = '#CCCCCC';
      pathColor = '#2DB492';
    } else {
      circleColor = '#2DB492';
      pathColor = '#B5FFEC';
    }

    // Concavity of pie slice arc depends on whether it travels to right (< pi) or left (> pi)
    angle % ( 2 * Math.PI ) > Math.PI ? largeArc = 1 : largeArc = 0;

    // Create background circle (target of metric)
    svg.append( 'circle' )
      .attr( 'cx', cx )
      .attr( 'cy', cy )
      .attr( 'r', outerR )
      .attr( 'fill', circleColor );

    // Create donut slice on top of circle (total of metric so far),
    // making fill same color as background circle to avoid clipping
    svg.append( 'path' )
      .attr( 'd', 'M' + cx + ' ' + ( cy - midR ) +
        ' A ' + midR + ' ' + midR + ' 0 ' + largeArc + ' 1 ' +
        ( cx + xCoord * midR ) + ' ' + ( cy - yCoord * midR ))
      .attr( 'fill', circleColor )
      .attr( 'stroke', pathColor )
      .attr( 'stroke-width', outerR * 0.2 )
      .attr( 'stroke-linecap', 'round' );

    // Create interior circle that matches background to create donut chart
    svg.append( 'circle' )
      .attr( 'cx', cx )
      .attr( 'cy', cy )
      .attr( 'r', innerR )
      .attr( 'fill', '#FFFFFF' );

    // Add data label to donut chart
    svg.append( 'text' )
      .attr( 'x', cx )
      .attr( 'y', cy + ( labelSize / 4 ))
      .attr( 'text-anchor', 'middle' )
      .attr( 'font-size', labelSize )
      .attr( 'fill', pathColor )
      .text( percentageString + '%' );
  }
};