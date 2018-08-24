import Map from 'ol/Map.js'
import View from 'ol/View.js'
import Overlay from 'ol/Overlay.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {defaults as defaultControls} from 'ol/control.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {OSM, Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style.js'
import {fromLonLat, toLonLat} from 'ol/proj.js'
import {defaults as defaultInteractions} from 'ol/interaction.js'
import TileJSON from 'ol/source/TileJSON.js'

require('../css/ol.css')
var image = new Icon({
  src: '/modules/custom/nscn_map/assets/images/flag.png',
  anchor: [0.5, 1]
})

var styles = {
  'Point': new Style({
    image: image
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      width: 1
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      width: 1
    })
  }),
  'MultiPoint': new Style({
    image: image
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(0, 132, 134, 1)'
    })
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      lineDash: [4],
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 132, 134, .1)'
    })
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(0, 132, 134, 1)'
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'rgba(0, 132, 134, 1)'
      })
    })
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 132, 134, 1)',
      width: 4
    }),
    fill: new Fill({
      color: 'rgba(0, 132, 134, 1)'
    })
  })
}


/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


var styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()]
}

var geojsonObject = document.getElementById('map').dataset.geojson

var vectorSource = new VectorSource({
  features: (new GeoJSON({})).readFeatures(geojsonObject, {
    featureProjection: 'EPSG:3857'
  })
})

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction
})

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  target: 'map',
  controls: defaultControls({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: new View({
    center: fromLonLat([10.1890, 56.1619]),
    zoom: 13
  }),
  interactions: defaultInteractions({ mouseWheelZoom: false }),
  overlays: [overlay]
})

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature, layer) {
      return feature;
    });
  if (feature) {
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));

    var content_html = feature.get('description');

    content.innerHTML = content_html;
    overlay.setPosition(coordinate);
    console.info(feature.getProperties());
  }
});

map.on('pointermove', function(e) {
  if (e.dragging) return;

  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

var source = vectorLayer.getSource()
map.getView().fit(source.getExtent(), {padding: [170, 50, 30, 150]})
