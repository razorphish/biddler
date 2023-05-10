export interface ReviewResult {
  hospitalId: number;
  phaseId: string;
  questionId: number;
  questionSortOrder: number;
  answerSortOrder: number;
  questionContent: string;
  answerRow: string;
  answerColumn: string;
  parentCategoryId: number;
  categoryId: string;
  categoryTitle: string;
  tickMark: string;
  answerValue: string;
  answerType: string;
  findingLanguage: string;
}

export interface SummarizedReviewResult {
  questionId: number;
  tick: string;
  content: string;
  category: string;
  passFail: string;
}
