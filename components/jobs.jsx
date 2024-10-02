import { images } from "../constants";

export const jobs = [
    {
      id: 1,
      title: 'Plowing 10 Acres at Greenfield Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 }, // Kitale coordinates
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-10-01T08:00:00Z'),
      duration: 4, // in hours
      instructions: 'Be sure to check the soil moisture before starting.',
      image: images.farm1,
      farmSize: '120 Ha'
    },
    {
      id: 2,
      title: 'Tilling 5 Acres at Riverside Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-09-30T09:00:00Z'),
      duration: 3,
      instructions: 'Check for any obstacles in the field before starting.',
      image: images.farm2,
      farmSize: '220 Ha'
    },
    {
      id: 3,
      title: 'Fertilizing 8 Acres at Hilltop Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-09-29T10:00:00Z'),
      duration: 2,
      instructions: 'Apply fertilizer evenly across the entire field.',
      image: images.farm5,
      farmSize: '160 Ha'
    },
    {
      id: 4,
      title: 'Harvesting 15 Acres at Oakwood Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-09-28T11:00:00Z'),
      duration: 5,
      instructions: 'Ensure all equipment is ready and in good condition.',
      image: images.farm6,
      farmSize: '420 Ha'
    },
    {
      id: 5,
      title: 'Planting 20 Acres at Sunnydale Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-10-05T07:00:00Z'),
      duration: 6,
      instructions: 'Plant crops in rows spaced 2 meters apart.',
      image: images.farm7,
      farmSize: '4530 Ha'
    },
    {
      id: 6,
      title: 'Spraying Pesticides on 12 Acres at Redhill Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-10-03T09:00:00Z'),
      duration: 4,
      instructions: 'Use a low-concentration pesticide and avoid windy conditions.',
      image: images.farm8,
      farmSize: '1200 Ha'
    },
    {
      id: 7,
      title: 'Irrigating 25 Acres at Bluefield Farm',
      farmLocation: { latitude: 0.0170, longitude: 34.9840 },
      farmPolygon: [
        { latitude: 0.0170, longitude: 34.9840 },
        { latitude: 0.0175, longitude: 34.9845 },
        { latitude: 0.0165, longitude: 34.9850 },
        { latitude: 0.0160, longitude: 34.9845 },
      ],
      startTime: new Date('2024-10-04T10:00:00Z'),
      duration: 5,
      instructions: 'Make sure water evenly covers the entire field.',
      image: images.farm6,
      farmSize: '7820 Ha'
    }
];
