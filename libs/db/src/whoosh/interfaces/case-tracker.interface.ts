import { PaginationArgs } from './pagination.interface';
import { CaseTrackerOutput } from '../views/caseTracker.view';
import { CaseTrackerAbbreviatedOutput } from '../views/caseTrackerAbbreviated.view';

export interface CaseTrackerPaginationArgs extends PaginationArgs {
  detailed?: boolean;
}

export interface CaseTrackerPaginationFindAllOutput {
  count: number;
  rows: CaseTrackerOutput[] | CaseTrackerAbbreviatedOutput[];
  totalCount: number;
}
