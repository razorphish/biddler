export interface DocumentMailingDate {
  batchCaseId: number;
  caseAssessmentFileId: number;
  docTypeId: number;
  docTitle: string;
  fileMetaId: number;
  fileMetaDisplayName: string;
  mailingDate: Date;
}

export type MailingDates = {
  [documentType: string]: Date;
};

export interface CaseDatesInfo {
  appliedMailingDates: MailingDates; // Dates used to determine the initial mailing date
  capReRequestDueDate?: Date;
  generatedMailingDates: MailingDates; // Mailing Dates of generated documents
}
