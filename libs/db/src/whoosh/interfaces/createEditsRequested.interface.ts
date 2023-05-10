export interface CreateEditsRequested {
  // Primary key
  caseId: number;

  // Attributes
  date: Date;
  hospitalName: string;
  reviewSection: string;
  testQuestion: string;
  action: string;
  actionText: string;
  actionDateTime: Date;
  reviewActivity: string;
  phase: string;
  actionEnteredBy: string;
  complianceUsers: string;
}
