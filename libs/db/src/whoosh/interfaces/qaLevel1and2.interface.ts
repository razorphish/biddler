export interface QALevel1And2 {
  // Primary Key
  id?: number;

  date: Date;
  hospitalName: string;
  caseId: number;
  activity: string;
  activityStart: Date;
  activityEnd: Date;
  phase: string;
  activityCompletedBy: string;
}
