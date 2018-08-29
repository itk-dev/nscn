
var image = new Icon({
  src: '/themes/custom/hoeringsportal/static/images/flag.png',
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


document.addEventListener("DOMContentLoaded", function(event) {
  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()]
  }

  var geojsonObject = document.getElementById('map').dataset.geojson


  var vectorSource = new ol.VectorSource({
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
      zoom: 5
    }),
    interactions: defaultInteractions({ mouseWheelZoom: false })
  })


  /**
   * Add a click handler to the map to render the popup.
   */
  map.on('singleclick', function(evt) {
    console.log('123');
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));

    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
    overlay.setPosition(coordinate);
  });

  var source = vectorLayer.getSource()
  map.getView().fit(source.getExtent(), map.getSize(), {padding: [170, 50, 30, 150]})
});
