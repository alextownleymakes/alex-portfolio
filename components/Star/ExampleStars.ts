// ExampleStars.ts

import { Star, StarPhase } from './Star';

export const starsOld: Star[] = [
    {
        id: 0,
        name: 'Alpha Centauri A',
        mass: 1.1,
        chemicalComposition: { H: 0.7, He: 0.28, metals: 0.02 },
        phase: StarPhase.MainSequence,
        density: 1.1,
        luminosity: 1.5,
        color: '#f7e7a1',
        temperature: 5790,
        age: 4.85,
        radius: 1.2,
        position: { x: 100, y: 100 }, // StarSystem coordinate
    }
];

const galaxy = {
    starSystems: [
        {
            name: 'star system 1',
            stars: [
                {
                    name: 'star 1',
                    planets: [
                        {
                            name: 'planet 1',
                            position: { x: 100, y: 100 },
                            size: 10,
                            color: 'blue',
                            label: 'A',
                            moons: [
                                {
                                    name: 'moon 1',
                                    position: { x: 10, y: 10 },
                                    size: 2,
                                    color: 'gray',
                                    label: '1'
                                },
                                {
                                    name: 'moon 2',
                                    position: { x: 20, y: 20 },
                                    size: 3,
                                    color: 'gray',
                                    label: '2'
                                }
                            ]
                        },
                        {
                            name: 'planet 2',
                            position: { x: 200, y: 200 },
                            size: 20,
                            color: 'red',
                            label: 'B',
                            moons: [
                                {
                                    name: 'moon 3',
                                    position: { x: 30, y: 30 },
                                    size: 4,
                                    color: 'gray',
                                    label: '3'
                                },
                                {
                                    name: 'moon 4',
                                    position: { x: 40, y: 40 },
                                    size: 5,
                                    color: 'gray',
                                    label: '4'
                                }
                            ]
                        },
                        {
                            name: 'planet 3',
                            position: { x: 300, y: 300 },
                            size: 30,
                            color: 'green',
                            label: 'C',
                            moons: [
                                {
                                    name: 'moon 5',
                                    position: { x: 50, y: 50 },
                                    size: 6,
                                    color: 'gray',
                                    label: '5'
                                },
                                {
                                    name: 'moon 6',
                                    position: { x: 60, y: 60 },
                                    size: 7,
                                    color: 'gray',
                                    label: '6'
                                }
                            ]
                        }
                    ],
                    asteroidBelts: [
                        {
                            name: 'asteroid belt 1',
                            position: { x: 10, y: 10 }
                        }
                    ],
                    comets: [
                        {
                            name: 'comet 1',
                            position: { x: 10, y: 10 }
                        }
                    ],
                    position: { x: 100, y: 100 }
                },
                {
                    name: 'star 2',
                    planets: [
                        {
                            name: 'planet 4',
                            position: { x: 400, y: 400 },
                            size: 40,
                            color: 'orange',
                            label: 'D',
                            moons: [
                                {
                                    name: 'moon 7',
                                    position: { x: 70, y: 70 },
                                    size: 8,
                                    color: 'gray',
                                    label: '7'
                                },
                                {
                                    name: 'moon 8',
                                    position: { x: 80, y: 80 },
                                    size: 9,
                                    color: 'gray',
                                    label: '8'
                                }
                            ]
                        },
                        {
                            name: 'planet 5',
                            position: { x: 500, y: 500 },
                            size: 50,
                            color: 'purple',
                            label: 'E',
                            moons: [
                                {
                                    name: 'moon 9',
                                    position: { x: 90, y: 90 },
                                    size: 10,
                                    color: 'gray',
                                    label: '9'
                                },
                                {
                                    name: 'moon 10',
                                    position: { x: 100, y: 100 },
                                    size: 11,
                                    color: 'gray',
                                    label: '10'
                                }
                            ]
                        }
                    ],
                    asteroidBelts: [
                        {
                            name: 'asteroid belt 2',
                            position: { x: 20, y: 20 }
                        }
                    ],
                    comets: [
                        {
                            name: 'comet 2',
                            position: { x: 20, y: 20 }
                        }
                    ],
                    position: { x: 200, y: 200 }
                },
                {
                    name: 'star 3',
                    planets: [
                        {
                            name: 'planet 6',
                            position: { x: 600, y: 600 },
                            size: 60,
                            color: 'yellow',
                            label: 'F',
                            moons: [
                                {
                                    name: 'moon 11',
                                    position: { x: 110, y: 110 },
                                    size: 12,
                                    color: 'gray',
                                    label: '11'
                                },
                                {
                                    name: 'moon 12',
                                    position: { x: 120, y: 120 },
                                    size: 13,
                                    color: 'gray',
                                    label: '12'
                                }
                            ]
                        }
                    ],
                    position: { x: 300, y: 300 }

                }
            ],
            position: { x: 100, y: 100 }
        },
        {
            name: 'star system 2',
            stars: [
                {
                    name: 'star 4',
                    planets: [
                        {
                            name: 'planet 7',
                            position: { x: 700, y: 700 },
                            size: 70,
                            color: 'blue',
                            label: 'G',
                            moons: [
                                {
                                    name: 'moon 13',
                                    position: { x: 130, y: 130 },
                                    size: 14,
                                    color: 'gray',
                                    label: '13'
                                },
                                {
                                    name: 'moon 14',
                                    position: { x: 140, y: 140 },
                                    size: 15,
                                    color: 'gray',
                                    label: '14'
                                }
                            ]
                        },
                        {
                            name: 'planet 8',
                            position: { x: 800, y: 800 },
                            size: 80,
                            color: 'red',
                            label: 'H',
                            moons: [
                                {
                                    name: 'moon 15',
                                    position: { x: 150, y: 150 },
                                    size: 16,
                                    color: 'gray',
                                    label: '15'
                                },
                                {
                                    name: 'moon 16',
                                    position: { x: 160, y: 160 },
                                    size: 17,
                                    color: 'gray',
                                    label: '16'
                                }
                            ]
                        }
                    ],
                    asteroidBelts: [
                        {
                            name: 'asteroid belt 3',
                            position: { x: 30, y: 30 }
                        }
                    ],
                    comets: [
                        {
                            name: 'comet 3',
                            position: { x: 30, y: 30 }
                        }
                    ],
                    position: { x: 400, y: 400 }
                }
            ],
            position: { x: 200, y: 200 }
        },
        {
            name: 'star system 3',
            stars: [
                {
                    name: 'star 5',
                    planets: [
                        {
                            name: 'planet 9',
                            position: { x: 900, y: 900 },
                            size: 90,
                            color: 'green',
                            label: 'I',
                            moons: [
                                {
                                    name: 'moon 17',
                                    position: { x: 170, y: 170 },
                                    size: 18,
                                    color: 'gray',
                                    label: '17'
                                },
                                {
                                    name: 'moon 18',
                                    position: { x: 180, y: 180 },
                                    size: 19,
                                    color: 'gray',
                                    label: '18'
                                }
                            ]
                        },
                        {
                            name: 'planet 10',
                            position: { x: 1000, y: 1000 },
                            size: 100,
                            color: 'orange',
                            label: 'J',
                            moons: [
                                {
                                    name: 'moon 19',
                                    position: { x: 190, y: 190 },
                                    size: 20,
                                    color: 'gray',
                                    label: '19'
                                },
                                {
                                    name: 'moon 20',
                                    position: { x: 200, y: 200 },
                                    size: 21,
                                    color: 'gray',
                                    label: '20'
                                }
                            ]
                        }
                    ],
                    comets: [
                        {
                            name: 'comet 4',
                            position: { x: 40, y: 40 }
                        }
                    ],
                    position: { x: 500, y: 500 }
                }
            ],
            position: { x: 300, y: 300 }
        }
    ]
}

const starSystems = [
    {
        id: 0,
        name: 'star system 1',
        stars: [0, 1, 2],
        position: { x: 100, y: 100 }
    },
    {
        id: 1,
        name: 'star system 2',
        stars: [3, 4],
        position: { x: 200, y: 200 }
    },
    {
        id: 2,
        name: 'star system 3',
        stars: [5, 6],
        position: { x: 300, y: 300 }
    }
]

const stars = [
    {
        id: 0,
        name: 'star 1',
        planets: [0, 1, 2],
        asteroidBelts: [3],
        position: { x: 100, y: 100 }
    },
    {
        id: 1,
        name: 'star 2',
        asteroidBelts: [0],
        comets: [0],
        position: { x: 200, y: 200 }
    },
    {
        id: 2,
        name: 'star 3',
        planets: [3, 4],
        position: { x: 300, y: 300 }
    },
    {
        id: 3,
        name: 'star 4',
        planets: [6, 7],
        asteroidBelts: [1],
        comets: [4],
        position: { x: 400, y: 400 }
    },
    {
        id: 4,
        name: 'star 5',
        planets: [8, 5, 9],
        position: { x: 500, y: 500 }
    },
    {
        id: 5,
        name: 'star 6',
        planets: [10],
        comets: [2, 6, 7, 8],
        position: { x: 600, y: 600 }
    },
    {
        id: 6,
        name: 'star 7',
        planets: [11],
        asteroidBelts: [2],
        comets: [1, 3, 5],
        position: { x: 700, y: 700 }
    },
    {
        id: 7,
        name: 'star 8',
        planets: [12],
        position: { x: 800, y: 800 }
    },
    {
        id: 8,
        name: 'star 9',
        planets: [13],
        position: { x: 900, y: 900 }
    },
    {
        id: 9,
        name: 'star 10',
        planets: [14],
        position: { x: 1000, y: 1000 }
    }
]

const planets = [
    {
        id: 0,
        name: 'planet 1',
        moons: [0, 1],
        satellites: [0, 1],
        position: { x: 100, y: 100 },
    },
    {
        id: 1,
        name: 'planet 2',
        moons: [2, 3],
        satellites: [2, 3],
        position: { x: 200, y: 200 },
    },
    {
        id: 2,
        name: 'planet 3',
        moons: [4, 5],
        satellites: [4, 5],
        position: { x: 300, y: 300 },
    },
    {
        id: 3,
        name: 'planet 4',
        moons: [6, 7],
        satellites: [6, 7],
        position: { x: 400, y: 400 },
    },
    {
        id: 4,
        name: 'planet 5',
        moons: [8, 9],
        satellites: [8, 9],
        position: { x: 500, y: 500 },
    },
    {
        id: 5,
        name: 'planet 6',
        moons: [10, 11],
        satellites: [10, 11],
        position: { x: 600, y: 600 },
    },
    {
        id: 6,
        name: 'planet 7',
        moons: [12, 13],
        satellites: [12, 13],
        position: { x: 700, y: 700 },
    },
    {
        id: 7,
        name: 'planet 8',
        moons: [14, 15],
        satellites: [14, 15],
        position: { x: 800, y: 800 },
    },
    {
        id: 8,
        name: 'planet 9',
        moons: [16, 17],
        satellites: [16, 17],
        position: { x: 900, y: 900 },
    },
    {
        id: 9,
        name: 'planet 10',
        moons: [18, 19],
        satellites: [18, 19],
        position: { x: 1000, y: 1000 },
    },
    {
        id: 10,
        name: 'planet 11',
        moons: [20, 21],
        satellites: [20, 21],
        position: { x: 1100, y: 1100 },
    },
    {
        id: 11,
        name: 'planet 12',
        moons: [22, 23],
        satellites: [22, 23],
        position: { x: 1200, y: 1200 },
    }
]

const moons = [
    {
        id: 0,
        name: 'moon 1',
        position: { x: 10, y: 10 },
    },
    {
        id: 1,
        name: 'moon 2',
        position: { x: 20, y: 20 },
    },
    {
        id: 2,
        name: 'moon 3',
        position: { x: 30, y: 30 },
    },
    {
        id: 3,
        name: 'moon 4',
        position: { x: 40, y: 40 },
    },
    {
        id: 4,
        name: 'moon 5',
        position: { x: 50, y: 50 },
    },
    {
        id: 5,
        name: 'moon 6',
        position: { x: 60, y: 60 },
    },
    {
        id: 6,
        name: 'moon 7',
        position: { x: 70, y: 70 },
    },
    {
        id: 7,
        name: 'moon 8',
        position: { x: 80, y: 80 },
    },
    {
        id: 8,
        name: 'moon 9',
        position: { x: 90, y: 90 },
    },
    {
        id: 9,
        name: 'moon 10',
        position: { x: 100, y: 100 },
    },
    {
        id: 10,
        name: 'moon 11',
        position: { x: 110, y: 110 },
    },
    {
        id: 11,
        name: 'moon 12',
        position: { x: 120, y: 120 },
    },
    {
        id: 12,
        name: 'moon 13',
        position: { x: 130, y: 130 },
    },
    {
        id: 13,
        name: 'moon 14',
        position: { x: 140, y: 140 },
    },
    {
        id: 14,
        name: 'moon 15',
        position: { x: 150, y: 150 },
    },
    {
        id: 15,
        name: 'moon 16',
        position: { x: 160, y: 160 },
    }
]

const satellites = [
    {
        id: 0,
        name: 'satellite 1',
        position: { x: 10, y: 10 },
    },
    {
        id: 1,
        name: 'satellite 2',
        position: { x: 20, y: 20 },
    },
    {
        id: 2,
        name: 'satellite 3',
        position: { x: 30, y: 30 },
    },
    {
        id: 3,
        name: 'satellite 4',
        position: { x: 40, y: 40 },
    },
    {
        id: 4,
        name: 'satellite 5',
        position: { x: 50, y: 50 },
    },
    {
        id: 5,
        name: 'satellite 6',
        position: { x: 60, y: 60 },
    },
    {
        id: 6,
        name: 'satellite 7',
        position: { x: 70, y: 70 },
    },
    {
        id: 7,
        name: 'satellite 8',
        position: { x: 80, y: 80 },
    },
    {
        id: 8,
        name: 'satellite 9',
        position: { x: 90, y: 90 },
    },
    {
        id: 9,
        name: 'satellite 10',
        position: { x: 100, y: 100 },
    },
    {
        id: 10,
        name: 'satellite 11',
        position: { x: 110, y: 110 },
    },
    {
        id: 11,
        name: 'satellite 12',
        position: { x: 120, y: 120 },
    },
    {
        id: 12,
        name: 'satellite 13',
        position: { x: 130, y: 130 },
    },
    {
        id: 13,
        name: 'satellite 14',
        position: { x: 140, y: 140 },
    },
    {
        id: 14,
        name: 'satellite 15',
        position: { x: 150, y: 150 },
    },
    {
        id: 15,
        name: 'satellite 16',
        position: { x: 160, y: 160 },
    }
]

const asteroidBelts = [
    {
        id: 0,
        name: 'asteroid belt 1',
        position: { x: 10, y: 10 },
    },
    {
        id: 1,
        name: 'asteroid belt 2',
        position: { x: 20, y: 20 },
    },
    {
        id: 2,
        name: 'asteroid belt 3',
        position: { x: 30, y: 30 },
    },
    {
        id: 3,
        name: 'asteroid belt 4',
        position: { x: 40, y: 40 },
    }
]

const comets = [
    {
        id: 0,
        name: 'comet 1',
        position: { x: 10, y: 10 },
    },
    {
        id: 1,
        name: 'comet 2',
        position: { x: 20, y: 20 },
    },
    {
        id: 2,
        name: 'comet 3',
        position: { x: 30, y: 30 },
    },
    {
        id: 3,
        name: 'comet 4',
        position: { x: 40, y: 40 },
    },
    {
        id: 4,
        name: 'comet 5',
        position: { x: 50, y: 50 },
    },
    {
        id: 5,
        name: 'comet 6',
        position: { x: 60, y: 60 },
    },
    {
        id: 6,
        name: 'comet 7',
        position: { x: 70, y: 70 },
    },
    {
        id: 7,
        name: 'comet 8',
        position: { x: 80, y: 80 },
    }
]

