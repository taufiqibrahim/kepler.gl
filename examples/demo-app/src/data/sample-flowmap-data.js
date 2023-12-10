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

// Sample Taxi Trip Data

export const dataId = 'flowmap-data';

export default {
    locations: [
        {
            id: '1',
            name: 'Métro Charlevoix (Centre / Charlevoix)',
            lat: 40.713543,
            lon: -74.011219
        },
        {
            id: '2',
            name: 'Métro Charlevoix (Centre / Charlevoix)',
            lat: 51.507425,
            lon: -0.127738
        },
        {
            id: '3',
            name: 'Métro Charlevoix (Centre / Charlevoix)',
            lat: -22.906241,
            lon: -43.180244
        },
    ],
    flows: [
        { origin: '1', dest: '2', count: 42 },
        { origin: '2', dest: '1', count: 51 },
        { origin: '3', dest: '1', count: 50 },
        { origin: '2', dest: '3', count: 40 },
        { origin: '1', dest: '3', count: 22 },
        { origin: '3', dest: '2', count: 42 }
    ]
}


export const config = {
    //   version: 'v1',
    //   config: {
    //     visState: {
    //       layers: [
    //         {
    //           type: 'heatmap',
    //           config: {
    //             dataId: 'test_trip_data',
    //             columns: {
    //               lat: 'pickup_latitude',
    //               lng: 'pickup_longitude'
    //             },
    //             isVisible: true
    //           }
    //         },
    //         {
    //           type: 'point',
    //           config: {
    //             dataId: 'test_trip_data',
    //             columns: {
    //               lat: 'pickup_latitude',
    //               lng: 'pickup_longitude'
    //             },
    //             color: [255, 0, 0],
    //             label: 'pickup',
    //             isVisible: true,
    //             visConfig: {
    //               colorRange: {
    //                 colorMap: [
    //                   ['apple tree', '#FF000'],
    //                   ['banana peel', '#00FF00'],
    //                   ['banana peel 2', '#0000FF'],
    //                   ['mango mint pineapple juice', '#555555'],
    //                   ['orange peel', '#111111'],
    //                   ['orange peel 0', '#222222']
    //                 ]
    //               }
    //             }
    //           },
    //           visualChannels: {
    //             colorField: {
    //               name: 'fare_type',
    //               type: 'string'
    //             }
    //           }
    //         },
    //         {
    //           type: 'point',
    //           config: {
    //             dataId: 'test_trip_data',
    //             columns: {
    //               lat: 'dropoff_latitude',
    //               lng: 'dropoff_longitude'
    //             },
    //             color: [0, 0, 255],
    //             label: 'dropoff',
    //             isVisible: true
    //           }
    //         },
    //         {
    //           type: 'cluster',
    //           config: {
    //             dataId: 'test_trip_data',
    //             columns: {
    //               lat: 'pickup_latitude',
    //               lng: 'pickup_longitude'
    //             },
    //             isVisible: true
    //           }
    //         },
    //         {
    //           type: 'arc',
    //           config: {
    //             dataId: 'test_trip_data',
    //             label: 'pickup -> dropoff',
    //             columns: {
    //               lat0: 'pickup_latitude',
    //               lng0: 'pickup_longitude',
    //               lat1: 'dropoff_latitude',
    //               lng1: 'dropoff_longitude'
    //             },
    //             color: [255, 0, 0],
    //             isVisible: true,
    //             visConfig: {
    //               targetColor: [0, 0, 255]
    //             }
    //           }
    //         }
    //       ],
    //       filters: [
    //         {
    //           dataId: 'test_trip_data',
    //           name: 'tpep_pickup_datetime',
    //           enlarged: true
    //         },
    //         {
    //           dataId: 'test_trip_data',
    //           name: 'passenger_count'
    //         },
    //         {
    //           dataId: 'test_trip_data',
    //           name: 'fare_type',
    //           value: ['orange peel', 'apple tree']
    //         },
    //         {
    //           dataId: 'test_trip_data',
    //           name: 'is_completed',
    //           value: true
    //         }
    //       ]
    //     },
    //     mapStyle: {
    //       styleType: '41fv96u',
    //       visibleLayerGroups: {
    //         label: false,
    //         road: false,
    //         border: false,
    //         building: true,
    //         water: true,
    //         land: true,
    //         '3d building': false
    //       },
    //       mapStyles: {
    //         '41fv96u': {
    //           accessToken: null,
    //           custom: true,
    //           icon:
    //             'https://api.mapbox.com/styles/v1/MAPBOX_USER/cjg0ks54x300a2squ8fr9vhvq/static/-122.3391,37.7922,9,0,0/400x300?access_token=ACCESS_TOKEN&logo=false&attribution=false',
    //           id: '41fv96u',
    //           label: 'Outdoors',
    //           url: 'mapbox://styles/MAPBOX_USER/cjhnxdcfy4ug62sn6qdfjutob'
    //         }
    //       }
    //     }
    //   }
};
