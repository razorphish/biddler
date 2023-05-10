import { QALevel1And2 } from '../interfaces/qaLevel1and2.interface';
import { QALevel1And2Output } from '../views/qaLevel1And2.view';

export const toQaLevel1And2 = (output: QALevel1And2Output): QALevel1And2 => {
  return {
    date: output.date,
    hospitalName: output.hospitalName,
    caseId: output.caseId,
    activity: output.activity,
    activityStart: output.activityStart,
    activityEnd: output.activityEnd,
    phase: output.phase,
    activityCompletedBy: output.activityCompletedBy
  };
};
