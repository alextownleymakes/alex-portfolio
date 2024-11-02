import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { PlayerMission, missionAppear } from '@/state/playerSlice';
import { useDispatch } from 'react-redux';
import Drawer from '../Drawer/Drawer';
import { open } from '@/state/drawersStateSlice';
import { VFXSpan } from 'react-vfx';
import { ShaderPreset } from '@vfx-js/core';

const MissionCenter: React.FC = () => {

  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.player.missions);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const currentMission = useSelector((state: RootState) => state.player.currentMission);
  const [mission, setMission] = React.useState<PlayerMission | null>(null);

  useEffect(() => {
    const msn: PlayerMission[] = missions.filter((mission) => mission.origin.name === lowestOrbit.name);
    const availMsn = msn?.filter((mission) => !mission.started && !mission.failed) || undefined;
    availMsn && availMsn.length > 0 && availMsn[0].id && dispatch(missionAppear(availMsn[0].id));
  }, [lowestOrbit]);

  useEffect(() => {
    if (currentMission) {
      const msn = missions?.find((mission) => mission.id === currentMission);
      msn && setMission(msn);
    }
  }, [currentMission]);

  useEffect(() => {
    console.log('Mission:', mission);
    mission && dispatch(open({ drawer: 'missionControl' }));
  }, [mission]);

  return (
    <Drawer
      name="missionControl"
      position="top"
      styles={{
        left: '20%',
        right: '20%',
        width: 'auto',
      }}
      className='hud'
    >
      <div style={{ opacity: '0.8' }}>
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
    </Drawer>
  );
};

export default MissionCenter;
