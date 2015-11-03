var markerArray = [
  {latLng: [39.90, 12.45], name: 'Vatican City'},
  {latLng: [43.73, 7.41], name: 'Monaco'}
]

$(function(){
  $('#europe').vectorMap({
    map: 'europe_mill',
    scaleColors: ['#C8EEFF', '#0071A4'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false,
    markerStyle: {
      initial: {
        fill: '#F8E23B',
        stroke: '#383f47'
      }
    },
    backgroundColor: '#383f47',
    markers: markerArray
  });

var map = $('#europe').vectorMap('get', 'mapObject');
var draw = SVG('svgMapOverlay').size(660, 400);
var coords1 = map.latLngToPoint(markerArray[0].latLng[0],markerArray[0].latLng[1]);
var coords2 = map.latLngToPoint(markerArray[1].latLng[0],markerArray[1].latLng[1]);
draw.path().attr({ fill: 'none',stroke: '#c00', 'stroke-width': 2 }).M(coords1.x, coords1.y).L(coords2.x, coords2.y);

});
