import { CreateEditsRequested } from '../interfaces/createEditsRequested.interface';
import { CreateEditsRequestedOutput } from '../views/createEditsRequested.view';

export const toCreateEditsRequested = (
  output: CreateEditsRequestedOutput
): CreateEditsRequested => {
  return {
    caseId: output.caseId,

    // Attributes
    date: output.date,
    hospitalName: output.hospitalName,
    reviewSection: output.reviewSection,
    testQuestion: output.testQuestion,
    action: output.action,
    actionText: output.actionText,
    actionDateTime: output.actionDateTime,
    reviewActivity: output.reviewActivity,
    phase: output.phase,
    actionEnteredBy: output.actionEnteredBy,
    complianceUsers: output.complianceUsers
  };
};
