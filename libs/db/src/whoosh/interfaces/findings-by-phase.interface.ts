export interface Finding {
  hospitalId: number;
  phaseId: string;
  questionId: number;
  parentCategoryId: number;
  categoryId: number;
  categoryTitle: string;
  tickMark: string;
  answerValue: string;
  answerType: string;
  answerId: number;
  findingLanguage: string;
  createdDate: string;
  title: string;
}

export interface FindingsByPhase {
  [phaseName: string]: Finding[];
}
