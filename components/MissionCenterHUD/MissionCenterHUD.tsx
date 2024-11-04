import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { PlayerMission, missionStart, PlayerMissionStage, Target } from '@/state/playerSlice';
import { useDispatch } from 'react-redux';
import { open, close } from '@/state/drawersStateSlice';
import styles from './MissionCenter.module.scss';
import { HUDPieceProps } from '../HUD/HUDPiece';
import Grid from '@mui/material/Grid2';
import Body from '../Body/Body';
import { systems } from '../../utils/systems/systems';
import { findBody } from '../../utils/functions/calculations';

const MissionCenterBody: React.FC = () => {

  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.player.missions);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const currentMission = useSelector((state: RootState) => state.player.currentMission);
  const [mission, setMission] = React.useState<PlayerMission | null>(null);
  const [stage, setStage] = React.useState<PlayerMissionStage | null>(null);
  const [target, setTarget] = React.useState<Target | null>(null);
  const [originBody, setOriginBody] = React.useState<any>(null);
  const [targetBody, setTargetBody] = React.useState<any>(null);

  const handleMissionAppear = (msn: PlayerMission) => {
    const stage = msn.stage[0];
    const target = stage.target;
    const { name, type } = target;
    if (name && type) {
      setMission(msn)
      setStage(msn.stage[0]);
      setTarget(msn.stage[0].target);
      setTargetBody(findBody(systems, name, type));
    }
  }

  useEffect(() => {

    const msn: PlayerMission[] = missions.filter((mission) => mission.origin.name === lowestOrbit.name);
    const availMsn = msn?.filter((mission) => !mission.started && !mission.failed) || undefined;
    if (availMsn && availMsn.length > 0 && availMsn[0].id) handleMissionAppear(availMsn[0]);

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

  const acceptMission = () => {
    if (mission) {
      dispatch(missionStart(mission.id-1));
      dispatch(close({ drawer: 'missionControl' }));
    }
  }

  const declineMission = () => {
    if (mission) {
      dispatch(close({ drawer: 'missionControl' }));
      setMission(null);
    }
  }

  return (
    <div className={styles['mission-center-body']}>
      <Grid container spacing={3}>
        <Grid size={12} style={{ alignItems: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginTop: '-.8rem', textTransform: 'uppercase', }}>Mission Control</h1>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={4}>
          {mission &&
            <Grid
              container
              style={{

                textTransform: 'uppercase',
                margin: '0 auto',
                opacity: '.5',
              }}
              rowSpacing={1}
            >
              <Grid size={12}>
                <p><strong>MISSON:</strong> {mission?.name}</p>
              </Grid>
              <p><strong>OBJECTIVE:</strong> {mission?.description}</p>
              <Grid size={12}>
              </Grid>
              <Grid size={12}>
                <Grid container>
                  <strong>REWARD:</strong>
                  {mission?.reward.map(r => <Grid size={12}>{r.amount} {r.type} {r.description}</Grid>)}
                </Grid>
              </Grid>
            </Grid>
          }
        </Grid>
        <Grid size={4}>
          {targetBody &&
            <Grid container rowSpacing={1}>
              <Grid size={12}><strong>STATUS:</strong> {!mission?.started ? 'AVALABLE' : mission.failed ? 'FAILED' : mission.completed ? 'COMPLETED' : 'STAGE ' + mission.stage}</Grid>
              <Grid size={12}><strong>TARGET:</strong> {stage?.target.name}</Grid>
              <Grid
                size={12}
                style={{
                  border: `3px solid ${targetBody.color}`,
                  borderRadius: '50%',
                  margin: '10px 0 0 30px',
                  width: '150px',
                  height: '150px',
                  boxShadow: `0 0 200px 5px ${targetBody.color}`,
                }}
              >
                <Body
                  type={targetBody.type}
                  variant={targetBody.variant}
                  style={{ 
                    height: '144px', 
                    width: '144px', 
                    position: 'relative', 
                    filter: 'grayscale(1)', 
                    WebkitFilter: 'grayscale(1)', 
                    opacity: '.6' }}
                />
              </Grid>
            </Grid>
          }
        </Grid>
        <Grid size={4}>
          <Grid container rowSpacing={1}>
            <Grid size={12}>
              <button style={{zIndex: '2000'}} onClick={acceptMission}>Accept Mission</button>
            </Grid>
            <Grid size={12}>
              <button style={{zIndex: '2000'}} onClick={declineMission}>Decline Mission</button>
            </Grid>
          </Grid>
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
