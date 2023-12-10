// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {FlowmapLayer} from '@flowmap.gl/layers';
// // import {COLOR_SCHEMES} from '@flowmapGl.gl/data';
import {
  DEFAULT_LAYER_COLOR,
//   CHANNEL_SCALES,
//   ColorRange,
//   LAYER_VIS_CONFIGS
} from '@kepler.gl/constants';
// import {default as KeplerTable} from '@kepler.gl/table';
import Layer, {
  LayerBaseConfig,
//   LayerBaseConfigPartial,
  LayerColorConfig,
  LayerColumn,
  LayerSizeConfig,
  LayerBounds,
//   // LayerStrokeColorConfig,
//   // LayerHeightConfig
} from '../base-layer';
import {
  Merge,
//   RGBColor,
//   VisConfigBoolean,
//   VisConfigColorRange,
//   VisConfigColorSelect,
  VisConfigNumber,
//   // VisConfigRange
} from '@kepler.gl/types';
import FlowmapGlLayerIcon from './flowmap-gl-layer-icon';
import {hexToRgb, DataContainerInterface, createDataContainer} from '@kepler.gl/utils';

export type FlowmapGlLayerVisConfigSettings = {
  opacity: VisConfigNumber;
};

export type FlowmapGlLayerColumnsConfig = {
  orig_id: LayerColumn;
  orig_lat: LayerColumn;
  orig_lng: LayerColumn;
  dest_id: LayerColumn;
  dest_lat: LayerColumn;
  dest_lng: LayerColumn;
  count: LayerColumn;
};

export type FlowmapGlLayerVisConfig = {
  opacity: number;
};

export type FlowmapGlLayerVisualChannelConfig = LayerColorConfig & LayerSizeConfig;

export type FlowmapGlLayerConfig = Merge<
  LayerBaseConfig,
  {columns: FlowmapGlLayerColumnsConfig; visConfig: FlowmapGlLayerVisConfig}
> &
  FlowmapGlLayerVisualChannelConfig;

export type FlowmapGlLayerData = {
  index: number;
  locations: [object];
  flows: [object];
  clusterLevels: [object]
};

export type FlowmapGlLayerMeta = {
  bounds: LayerBounds;
};

export const FlowmapGlRequiredColumns = ['orig_id', 'orig_lat', 'orig_lng', 'dest_id', 'dest_lat', 'dest_lng', 'count'];
export const FlowmapGlColumnLabels = {
  orig_id: 'flowmap.orig_id',
  orig_lat: 'flowmap.orig_lat',
  orig_lng: 'flowmap.orig_lng',
  dest_id: 'flowmap.dest_id',
  dest_lat: 'flowmap.dest_lat',
  dest_lng: 'flowmap.dest_lng',
  count: 'flowmap.count',
};


export const FlowmapGlPosAccessor = ({orig_id, orig_lat, orig_lng, dest_id, dest_lat, dest_lng, count}: FlowmapGlLayerColumnsConfig) => (
  dc: DataContainerInterface
) => d => {
  return [
  dc.valueAt(d.index, orig_id.fieldIdx),
  dc.valueAt(d.index, orig_lat.fieldIdx),
  dc.valueAt(d.index, orig_lng.fieldIdx),
  dc.valueAt(d.index, dest_id.fieldIdx),
  dc.valueAt(d.index, dest_lat.fieldIdx),
  dc.valueAt(d.index, dest_lng.fieldIdx),
  dc.valueAt(d.index, count.fieldIdx),
]};

export const FlowmapGlVisConfigs: {
  opacity: 'opacity';
  // thickness: 'thickness';
  // colorRange: 'colorRange';
  // sizeRange: 'strokeWidthRange';
  // targetColor: 'targetColor';
} = {
  opacity: 'opacity',
  // thickness: 'thickness',
  // colorRange: 'colorRange',
  // sizeRange: 'strokeWidthRange',
  // targetColor: 'targetColor'
};

export default class FlowmapGlLayer extends Layer {
  declare visConfigSettings: FlowmapGlLayerVisConfigSettings;
  declare config: FlowmapGlLayerConfig;
  // declare meta: FlowmapGlLayerMeta;

  constructor(props) {
    super(props);

    this.registerVisConfig(FlowmapGlVisConfigs);
    this.getPositionAccessor = (dataContainer: DataContainerInterface) =>
      FlowmapGlPosAccessor(this.config.columns)(dataContainer);
  }

  get type() {
    return 'flowmapGl';
  }

  get isAggregated() {
    return false;
  }

  get layerIcon() {
    return FlowmapGlLayerIcon;
  }

  get requiredLayerColumns() {
    return FlowmapGlRequiredColumns;
  }

  get columnLabels() {
    return FlowmapGlColumnLabels;
  }

  calculateDataAttribute({dataContainer, filteredIndex}, getPosition) {
    console.log({name: 'calculateDataAttribute', dataContainer: dataContainer})
  //   const mockdata: FlowmapData<LocationType, FlowType> = {
  //     "locations": [
  //       {
  //           id: '1',
  //           name: 'AAAA',
  //           lat: 40.713543,
  //           lon: -74.011219
  //       },
  //       {
  //           id: '2',
  //           name: 'VBBB',
  //           lat: 51.507425,
  //           lon: -0.127738
  //       },
  //       {
  //           id: '3',
  //           name: 'CCCC',
  //           lat: -22.906241,
  //           lon: -43.180244
  //       },
  //     ],
  //     "flows": [
  //       { origin: '1', dest: '2', count: 42 },
  //       { origin: '2', dest: '1', count: 51 },
  //       { origin: '3', dest: '1', count: 50 },
  //       { origin: '2', dest: '3', count: 40 },
  //       { origin: '1', dest: '3', count: 22 },
  //       { origin: '3', dest: '2', count: 42 }
  //     ]
  //   };
  // return mockdata;
    
    const locationsMap = new Map();
    const flows = [];

    for (const row of dataContainer._rows) {
      const origId = row[0];
      const origLat = row[1];
      const origLon = row[2];
      const destId = row[3];
      const destLat = row[4];
      const destLon = row[5];
      const count = row[6];

      const origKey = origId.toString();
      const destKey = destId.toString();

      if (!locationsMap.has(origKey)) {
        const origLocation = {
          id:   origKey,
          lat:  origLat,
          lon:  origLon,
        };
        locationsMap.set(origKey, origLocation);
      }
  
      if (!locationsMap.has(destKey)) {
        const destLocation = {
          id: destKey,
          lat: destLat,
          lon: destLon,
        };
        locationsMap.set(destKey, destLocation);
      }
  
      flows.push({
        origin: origKey,
        dest: destKey,
        count: count,
      });

      console.log({row: row, locationsMap: locationsMap, flows: flows})
    }

    const data: FlowmapData<LocationType, FlowType> = {
      "locations": Array.from(locationsMap.values()),
      "flows": flows
    };
    console.log(data);

    return data;

  }

  formatLayerData(datasets, oldLayerData) {
    console.log({name: 'formatLayerData', config: this.config, datasets: datasets, oldLayerData: oldLayerData})
    if (this.config.dataId === null) {
      return {};
    }
    const {gpuFilter, dataContainer} = datasets[this.config.dataId];
    const {data} = this.updateData(datasets, oldLayerData);
    const accessors = this.getAttributeAccessors({dataContainer});
    return {
      data,
      getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(),
      ...accessors
    };
  }

  updateLayerMeta(dataContainer) {
    console.log({name: 'updateLayerMeta', dataContainer: dataContainer})
    // get bounds from flowmap data
    const getPosition = this.getPositionAccessor(dataContainer);

    const sBounds = this.getPointsBounds(dataContainer, d => {
      const pos = getPosition(d);
      return [pos[0], pos[1]];
    });
    const tBounds = this.getPointsBounds(dataContainer, d => {
      const pos = getPosition(d);
      return [pos[3], pos[4]];
    });

    const bounds =
      tBounds && sBounds
        ? [
            Math.min(sBounds[0], tBounds[0]),
            Math.min(sBounds[1], tBounds[1]),
            Math.max(sBounds[2], tBounds[2]),
            Math.max(sBounds[3], tBounds[3])
          ]
        : sBounds || tBounds;

    this.updateMeta({bounds});
  }

  /**
   * Check whether layer has data
   *
   * @param {Array | Object} layerData
   * @returns {boolean} yes or no
   */
  hasLayerData(layerData) {
    if (!layerData) {
      return false;
    }
    return Boolean(layerData.data);
  }

  shouldRenderLayer(data): boolean {
    console.log({
      name: 'shouldRenderLayer',
      data: data,
      boolthistype: Boolean(this.type),
      thishasAllColumns: this.hasAllColumns(),
      thishasLayerData: this.hasLayerData(data),
      t: typeof this.renderLayer === 'function',
    })
    return (
      Boolean(this.type) &&
      this.hasAllColumns() &&
      this.hasLayerData(data) &&
      typeof this.renderLayer === 'function'
    );
  }

  renderLayer(opts) {
    // console.log('renderLayer(opts)...')
    const {data, gpuFilter, interactionConfig, mapState} = opts;
    const updateTriggers = {
      getPosition: this.config.columns,
      getFilterValue: gpuFilter.filterValueUpdateTriggers,
      ...this.getVisualChannelUpdateTriggers()
    };
    const defaultLayerProps = {};
    // console.log({name: 'renderLayer', data:data, gpuFilter:gpuFilter, interactionConfig: interactionConfig, mapState: mapState})
    console.log({name: 'renderLayer', data:data})
    return [
      new FlowmapLayer({
        ...defaultLayerProps,
        ...interactionConfig,
        ...data,
        // darkMode: true,
        // colorScheme: 'Teal',
        // highlightColor: '#ff9b29',
        // opacity: 1.0,
        pickable: true,
        getLocationId: (loc) => loc.id,
        getLocationLat: (loc) => loc.lat,
        getLocationLon: (loc) => loc.lon,
        getFlowOriginId: (flow) => flow.origin,
        getFlowDestId: (flow) => flow.dest,
        getFlowMagnitude: (flow) => flow.count,
        getLocationName: (loc) => loc.name,
        // fadeEnabled: FlowmapLayer.defaultProps.fadeEnabled,
        // fadeOpacityEnabled: FlowmapLayer.defaultProps.fadeOpacityEnabled,
        // fadeAmount: FlowmapLayer.defaultProps.fadeAmount,
        // clusteringEnabled: FlowmapLayer.defaultProps.clusteringEnabled,
        // clusteringAuto: FlowmapLayer.defaultProps.clusteringAuto,
        // clusteringLevel: 5,
        // clusteringMethod: 'HCA',
        // animationEnabled: FlowmapLayer.defaultProps.animationEnabled,
        // adaptiveScalesEnabled: FlowmapLayer.defaultProps.adaptiveScalesEnabled,
        // locationsEnabled: FlowmapLayer.defaultProps.locationsEnabled,
        // locationTotalsEnabled: FlowmapLayer.defaultProps.locationTotalsEnabled,
        // locationLabelsEnabled: FlowmapLayer.defaultProps.locationLabelsEnabled,
        // maxTopFlowsDisplayNum: FlowmapLayer.defaultProps.maxTopFlowsDisplayNum,
        updateTriggers,
      })
    ]
  }

}

