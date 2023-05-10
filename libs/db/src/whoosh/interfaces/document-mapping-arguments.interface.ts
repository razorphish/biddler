import { Batch, Case, CaseAssessmentQuestionFile, CaseReview, Hospital } from '../models';
import { CaseOutput } from '../models/case.model';
import { HospitalOutput } from '../models/hospital.model';
import { BatchDocument } from './batch-documents.interface';
import { CasePhaseInfo } from './case-phase-info.interface';
import { ReviewSummaryResult } from './review-summary-result.interface';
import { CaseAssessmentObservation } from './case-assessment-observation.interface';
import { CaseDatesInfo } from './case-dates-interface';
import { CaseReviewComment } from './case-review.interface';
import { FindingsByPhase } from './findings-by-phase.interface';

export interface MappingArguments {
  hospital: Hospital | HospitalOutput;
  case?: Case | CaseOutput;
  review?: CaseReview;
  reviewSummaryResults?: ReviewSummaryResult[];
  reviewFiles?: CaseAssessmentQuestionFile[];
  reviewerComments?: CaseReviewComment[];
  phaseReviews?: CaseReview[];
  batch?: Batch;
  shoppableServicesFindings?: string[];
  machineReadableFindings?: string[];
  findingsByPhase?: FindingsByPhase;
  observationsByPhase?: { [key: string]: CaseAssessmentObservation[] };
  hospitalPhases?: any[];
  casePhaseInfo?: CasePhaseInfo[];
  batchDocuments?: BatchDocument[];
  categoryName?: string;
  caseDates?: CaseDatesInfo;
  reviewCount?: number;
}
