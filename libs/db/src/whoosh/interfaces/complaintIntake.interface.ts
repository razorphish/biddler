export interface ComplaintIntake {
  // Primary Key
  id: number;

  // Foreign Keys
  dataSourceId: number;
  statusId: string;

  // Attributes
  responseId?: string;
  responseLink?: string;
  responseStatus?: string;
  question2?: string;
  question3?: string;
  question4?: string;
  question5?: string;
  question6?: string;
  question7?: string;
  question8FileId?: number;
  question8FileLink?: string;
  question9?: string;
  question10?: string;
  question11?: string;
  question12?: string;
  question13?: string;
  question14?: string;
  question15?: string;
  question16?: string;
  question18?: string;
  question19?: string;
  question20FileId?: number;
  question20FileLink?: string;
  question21?: string;
  question22?: string;
  question23?: string;
  question24?: string;
  question25?: string;
  recipientPostalCode?: string;
  recipientCity?: string;
  recipientRegion?: string;
  recipientAreaCode?: string;
  recipientCountryCode?: string;
  question8FileName?: string;
  question8FileSize?: string;
  question20FileName?: string;
  question20FileSize?: string;
  question10FirstName?: string;
  question10LastName?: string;
  question10City?: string;
  question10State?: string;
  question10EmailAddress?: string;
  question10PhoneNumber?: string;
  question14HospitalFullName?: string;
  question14HospitalAddress?: string;
  question14HospitalCity?: string;
  question14HospitalState?: string;
  question14HospitalWebLink?: string;
  recordedDate: Date;
  transactionId?: string;
  meta?: JSON;

  // Children

  // Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt: Date | null;
}
