import { missionData } from '@/data/missionData';
import { UserData, Title } from '@/types/userType';

export function getMissionIcon(titleName: string) {
  const allMissions = [
    ...missionData.daily,
    ...missionData.weekly,
    ...missionData.monthly,
    ...missionData.community,
  ];

  const matched = allMissions.find((m) => m.missionTitle === titleName);
  return matched?.icon ?? null;
}
