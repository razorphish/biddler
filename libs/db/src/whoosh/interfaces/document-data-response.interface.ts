import { CaseFileTypeOutput } from '../models/caseFileType.model';

export interface FlatCaseAssessmentFile {
  caseAssessmentFileId: number;
  caseReviewId: number;
  caseReviewLastUpdatedBy: string;
  createdDate: string;
  displayName: string;
  documentId: number;
  documentType: string;
  fileMetaId: number;
  statusId: string;
}

export interface FlatCaseFile {
  caseFileId: number;
  caseFileTypeId: string;
  correspondenceDate: string;
  displayName: string;
  fileMetaId: number;
  fileScanInProcess: boolean;
  statusId: string;
  userCreatedDate?: string;
}

export interface DocumentDataResponse {
  caseAssessmentFiles: FlatCaseAssessmentFile[];
  files: FlatCaseFile[];
  uploadableDocumentTypes: Partial<CaseFileTypeOutput>[];
}
