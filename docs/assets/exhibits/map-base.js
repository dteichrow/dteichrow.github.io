/* Natural Earth geography is shipped with the site; no tile server or API key. */
window.EOEMaps = {
  createBaseLayer(theme = "dark") {
    const light = theme === "light";
    return L.geoJSON(window.EOE_LAND, {
      interactive: false,
      smoothFactor: 0.5,
      style: {
        color: light ? "#8a958e" : "#68827f",
        weight: 0.7,
        fillColor: light ? "#d7dacb" : "#283e40",
        fillOpacity: 1,
      },
      attribution:
        '<a href="https://www.naturalearthdata.com/about/terms-of-use/">Natural Earth</a> · geographic context; no historical political boundaries',
    });
  },
  createLabelLayer(theme = "dark") {
    const labels = [
      [43, -38, "Atlantic Ocean", 1],
      [10, -125, "Pacific Ocean", 1],
      [64, 7, "Norwegian Sea", 4],
      [39, 15, "Mediterranean Sea", 4],
      [14, 67, "Indian Ocean", 2],
    ];
    const LabelLayer = L.Layer.extend({
      onAdd(map) {
        this.map = map;
        this.group = L.layerGroup().addTo(map);
        this.update = () => {
          this.group.clearLayers();
          for (const [lat, lon, name, minZoom] of labels) {
            if (map.getZoom() < minZoom) continue;
            L.marker([lat, lon], {
              interactive: false,
              keyboard: false,
              icon: L.divIcon({
                className: "eoe-map-label " + theme,
                html: name,
                iconSize: [130, 20],
                iconAnchor: [65, 10],
              }),
            }).addTo(this.group);
          }
        };
        map.on("zoomend", this.update);
        this.update();
      },
      onRemove(map) {
        map.off("zoomend", this.update);
        map.removeLayer(this.group);
      },
    });
    return new LabelLayer();
  },
};
