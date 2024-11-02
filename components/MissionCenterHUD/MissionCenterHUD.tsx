import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { PlayerMission, missionAppear } from '@/state/playerSlice';
import { useDispatch } from 'react-redux';
import Drawer from '../Drawer/Drawer';
import { open } from '@/state/drawersStateSlice';
import MissionCenterBody from './MissionCenterBody';

const MissionCenterHUD: React.FC = () => {

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
      <MissionCenterBody mission={mission} />
    </Drawer>
  );
};

export default MissionCenterHUD;
