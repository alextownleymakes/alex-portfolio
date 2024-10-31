import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { PlayerMission, missionAppear } from '@/state/playerSlice';
import { useDispatch } from 'react-redux';
import Drawer from '../Drawer/Drawer';
import { open } from '@/state/drawersStateSlice';

const MissionCenter: React.FC = () => {

  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.player.missions);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const currentMission = useSelector((state: RootState) => state.player.currentMission);
  const [mission, setMission] = React.useState<PlayerMission | null>(null);

  useEffect(() => {

    const msn: PlayerMission[] = missions.filter((mission) => mission.body.name === lowestOrbit.name);
    const availMsn = msn?.filter((mission) => !mission.started && !mission.failed) || undefined;
    availMsn && availMsn[0] && availMsn[0].id && dispatch(missionAppear(availMsn[0].id));
    // availMsn && dispatch(missionAppear(availMsn[0].id));

  }, [lowestOrbit]);

  useEffect(() => {
    if (currentMission) {
      const msn = missions?.find((mission) => mission.id === currentMission);
      msn && setMission(msn);
    }
  }, [currentMission]);

  useEffect(() => {
    dispatch(open({ drawer: 'missionControl' }));
  }, [mission]);


  useEffect(() => {
    console.log('Missions:', missions);
  }, [missions]);

  return (
    <Drawer 
      name="missionControl" 
      position="top" 
      styles={{
        padding: '40px 50px',
        left: '20%',
        right: '20%',
        width: 'auto',
      }}
      className='hud'
    >
      <div>
        <h1>{mission?.name}</h1>
        <p>{mission?.description}</p>
        <p>Reward: {mission?.reward.amount} {mission?.reward.type}</p>
      </div>
    </Drawer>
  );
};

export default MissionCenter;
