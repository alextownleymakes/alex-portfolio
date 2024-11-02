import React from 'react';
import { VFXSpan } from 'react-vfx';
import { PlayerMission } from '@/state/playerSlice';
import styles from './MissionCenter.module.scss';

interface MissionCenterBodyProps {
    mission: PlayerMission | null;
}

const MissionCenterBody: React.FC<MissionCenterBodyProps> = ({ mission }) => {
    return (
        <div className={styles['mission-center-body']}>
            {/* {shaderList.map((shader: string) => (
          <VFXSpan 
            shader={shader}
            style={{fontSize: '1rem', textTransform: 'uppercase', margin: '0 auto'}}
          >{shader}</VFXSpan>
        ))} */}
            {mission &&
                <VFXSpan
                    shader="rgbShift"
                    style={{

                        textTransform: 'uppercase',
                        margin: '0 auto',
                        opacity: '.5',
                    }}
                >
                    <h1 style={{ fontSize: '2.5rem', marginTop: '-.8rem' }}>Mission Control</h1>
                    <p>MISSON: {mission?.name}</p>
                    <p>OBJECTIVE: {mission?.description}</p>
                    <p>Reward: {mission?.reward.amount} {mission?.reward.type}</p>
                    <p>STATUS: {!mission?.started ? 'AVALABLE' : mission.failed ? 'FAILED' : mission.completed ? 'COMPLETED' : 'STAGE ' + mission.stage}</p>
                    <p>ORIGIN: {mission?.origin.name}</p>
                </VFXSpan>
            }
        </div>
    )
};

export default MissionCenterBody;