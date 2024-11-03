import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { PlayerMission, missionAppear } from '@/state/playerSlice';
import { useDispatch } from 'react-redux';
import { VFXSpan } from 'react-vfx';
import { open } from '@/state/drawersStateSlice';
import styles from './MissionCenter.module.scss';
import { HUDPieceProps } from '../HUD/HUDPiece';
import Grid from '@mui/material/Grid2';

const MissionCenterBody: React.FC = () => {

  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.player.missions);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const currentMission = useSelector((state: RootState) => state.player.currentMission);
  const [mission, setMission] = React.useState<PlayerMission | null>(null);

  useEffect(() => {
    const msn: PlayerMission[] = missions.filter((mission) => mission.origin.name === lowestOrbit.name);
    const availMsn = msn?.filter((mission) => !mission.started && !mission.failed) || undefined;
    if (availMsn && availMsn.length > 0 && availMsn[0].id) dispatch(missionAppear(availMsn[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowestOrbit]);

  useEffect(() => {
    if (currentMission) {
      const msn = missions?.find((mission) => mission.id === currentMission);
      if (msn) setMission(msn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMission]);

  useEffect(() => {
    if (mission) dispatch(open({ drawer: 'missionControl' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission]);

  return (
    <div className={styles['mission-center-body']}>
      <Grid container spacing={3}>
        <Grid size={12} style={{alignItems: 'center'}}>
          <h1 style={{ fontSize: '2.5rem', marginTop: '-.8rem', textTransform: 'uppercase', }}>Mission Control</h1>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={6}>
          {mission &&
            <div
              // shader="rgbShift"
              style={{

                textTransform: 'uppercase',
                margin: '0 auto',
                opacity: '.5',
              }}
            >
              <p>MISSON: {mission?.name}</p>
              <p>OBJECTIVE: {mission?.description}</p>
              <p>Reward: {mission?.reward.map(r => r.amount)} {mission?.reward.map(r => r.type)}</p>

            </div>
          }
        </Grid>
        <Grid size={6}>
          <p>STATUS: {!mission?.started ? 'AVALABLE' : mission.failed ? 'FAILED' : mission.completed ? 'COMPLETED' : 'STAGE ' + mission.stage}</p>
          <p>ORIGIN: {mission?.origin.name}</p>
        </Grid>
      </Grid>
    </div>
  )
};

export const missionCenterProps: HUDPieceProps = {
  name: 'missionControl',
  position: 'top',
  styles: {
    left: '20%',
    right: '20%',
    width: 'auto',
  },
  className: 'hud',
  children: <MissionCenterBody />
}
