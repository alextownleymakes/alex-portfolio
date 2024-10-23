export interface MissionType {
    id: number;
    name: string;
    description: string;
    reward: number;
    requirements: string;
    objectives: ObjectiveType[];
    completed: boolean;
}

export interface ObjectiveType {
    name: string;
    description: string;
    arriveAt: string;
    completed: boolean;
}

const missions: MissionType[] = []

const portfolioMission: MissionType = {
    id: 0,
    name: 'Portfolio',
    description: 'Search Earth for Alex\'s portfolio',
    reward: 100,
    requirements: 'None',
    objectives: [
        {
            name: 'Find Alex\'s Resume',
            description: 'Search Earth for Alex\'s portfolio',
            arriveAt: 'Earth',
            completed: false,
        },
    ],
    completed: false,
}