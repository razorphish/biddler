/**
 * Declaration Order matters here:
 * Be sure to sort the import models in order of availability
 */

// Referenced/Standalone tables
import Status from './status.model';
import DataSourceType from './dataSourceType.model';

import DataSource from './dataSource.model';

import DataLake from './datalake.model';
import User from './user.model';
import ApplicationContactType from './applicationContactType.model';
import ApplicationContact from './applicationContact.model';
import AddressType from './addressType.model';
import Address from './address.model';
import FileMeta from './fileMeta.model';
import ShoppableService from './shoppableService.model';

import AddressHospital from './addressHospital.model';
import CapSubmissionStatus from './capSubmissionStatus.model';
import HospitalSystem from './hospitalSystem.model';
import HospitalType from './hospitalType.model';
import Hospital from './hospital.model';
import HospitalResponseType from './hospitalResponseType.model';
import ComplaintIntake from './complaintIntake.model';
import ComplaintScope from './complaintScope.model';
import ComplaintResponse from './complaintResponse.model';
import ComplaintScore from './complaintScore.model';
import ComplaintScoreSummary from './complaintScoreSummary.model';
import ComplaintTestAreaSummary from './complaintTestAreaSummary.model';
import EventComplaint from './eventComplaint.model';
import Case from './case.model';
import CaseNote from './caseNote.model';
import Complaint from './complaint.model';
import EventInfo from './eventInfo.model';
import DocumentItem from './documentItems.model';
import Document from './document.model';
import DocumentType from './documentType.model';
import CmsHolidayCalendar from './cmsHolidayCalendar.model';
// Review/Cases/Assessment
import Batch from './batch.model';
import BatchCase from './batchCase.model';
import BackgroundJob from './backgroundJob.model';
import BatchFile from './batchFile.model';
import AssessmentCategory from './assessmentCategory.model';
import AssessmentAnswerType from './assessmentAnswerType.model';
import AssessmentAnswer from './assessmentAnswer.model';
import AssessmentQuestion from './assessmentQuestion.model';
import Assessment from './assessment.model';
import AssessmentPhase from './assessmentPhase.model';
import AssessmentShoppableService from './assessmentShoppableService.model';
import DocType from './docType.model';

import CaseAssessmentFile from './caseAssessmentFile.model';
import CaseAssessmentResponse from './caseAssessmentResponse.model';
import CasePhase from './casePhase.model';
import CaseAssessmentQuestionDispatch from './caseAssessmentQuestionDispatch.model';
import CaseAssessmentQuestionFile from './caseAssessmentQuestionFile.model';
import CaseAssessmentQuestionNote from './caseAssessmentQuestionNote.model';
import CaseAssessmentQuestion from './caseAssessmentQuestion.model';
import CaseReview from './caseReview.model';
import CaseAssessment from './caseAssessment.model';
import CaseFile from './caseFile.model';
import CaseFileType from './caseFileType.model';

// Imports
import HospitalImport from './import.hospital.model';
import HospitalAddressImport from './import.hospitalAddress.model';
import Phase2ReviewImport from './import.phase2Review.model';
import ComplaintImport from './import.complaint.model';
import QualtricsImport from './import.qualtrics.model';
import QualtricsResponseImport from './import.qualtricsResponse.model';

//Junction Tables
import HospitalDocument, {
  HospitalDocumentInput,
  HospitalDocumentOutput
} from './hospitalDocument.model';
import CaseUser from './caseUser.model';
import ReportExportType from './reportExportType.model';
import ReportOutputMeta from './reportOutputMeta.model';
import Report from './report.model';
import ReportOutputHistory from './reportOutputHistory.model';
import ReportOutputMetaUser from './reportOutputMetaUser.model';
import ReportGeneration from './reportGeneration.model';

export {
  Address,
  AddressHospital,
  AddressType,
  ApplicationContact,
  ApplicationContactType,
  Assessment,
  AssessmentAnswer,
  AssessmentAnswerType,
  AssessmentCategory,
  AssessmentPhase,
  AssessmentQuestion,
  AssessmentShoppableService,
  Batch,
  BatchFile,
  BackgroundJob,
  BatchCase,
  CapSubmissionStatus,
  Case,
  CaseAssessment,
  CaseAssessmentFile,
  CasePhase,
  CaseAssessmentQuestion,
  CaseAssessmentQuestionDispatch,
  CaseAssessmentQuestionFile,
  CaseAssessmentQuestionNote,
  CaseAssessmentResponse,
  CaseReview,
  CaseFile,
  CaseFileType,
  CaseNote,
  CaseUser,
  Complaint,
  ComplaintImport,
  ComplaintIntake,
  ComplaintResponse,
  ComplaintScope,
  ComplaintScore,
  ComplaintScoreSummary,
  ComplaintTestAreaSummary,
  DataLake,
  DataSource,
  DataSourceType,
  DocType,
  DocumentType,
  CmsHolidayCalendar,
  DocumentItem,
  Document,
  EventInfo,
  EventComplaint,
  FileMeta,
  Hospital,
  HospitalAddressImport,
  HospitalDocument,
  HospitalDocumentInput,
  HospitalDocumentOutput,
  HospitalImport,
  HospitalSystem,
  HospitalType,
  HospitalResponseType,
  Phase2ReviewImport,
  QualtricsImport,
  QualtricsResponseImport,
  ReportExportType,
  ReportOutputMeta,
  ReportGeneration,
  Report,
  ReportOutputHistory,
  ReportOutputMetaUser,
  ShoppableService,
  Status,
  User
};

AssessmentCategory.hasMany(AssessmentQuestion, {
  foreignKey: 'categoryId',
  as: 'questions',
  constraints: false
});

AssessmentQuestion.hasMany(CaseAssessmentResponse, {
  foreignKey: 'questionId',
  as: 'caseAssessmentResponses',
  constraints: false
});

AssessmentQuestion.hasOne(CaseAssessmentQuestion, {
  foreignKey: 'questionId',
  sourceKey: 'id',
  as: 'caseAssessmentQuestion',
  constraints: false
});

Complaint.belongsToMany(EventInfo, {
  through: EventComplaint,
  as: 'events',
  foreignKey: 'complaintId'
});

// Case References
Case.hasMany(Complaint, {
  foreignKey: 'caseId',
  as: 'complaints'
});

Case.hasMany(CaseAssessment, {
  foreignKey: 'caseId',
  as: 'caseAssessments'
});

Case.hasMany(CasePhase, {
  foreignKey: 'caseId',
  as: 'phases'
});

Case.hasMany(CaseNote, {
  foreignKey: 'caseId',
  as: 'notes'
});

Case.hasMany(CaseFile, {
  foreignKey: 'caseId',
  as: 'files'
});

// m<->m Case,Assessment
Case.belongsToMany(Assessment, {
  through: CaseAssessment,
  as: 'assessments',
  foreignKey: 'caseId'
});

Assessment.belongsToMany(Case, {
  through: CaseAssessment,
  as: 'cases',
  foreignKey: 'assessmentId'
});
// End

CaseAssessmentQuestion.belongsTo(CaseAssessment, {
  targetKey: 'id',
  foreignKey: 'caseAssessmentId',
  as: 'assessment'
});

CaseAssessment.hasMany(CaseAssessmentQuestion, {
  foreignKey: 'caseAssessmentId',
  as: 'questions'
});

// m<->m CaseAssessmentQuestion, File
CaseAssessmentQuestion.belongsToMany(FileMeta, {
  through: CaseAssessmentQuestionFile,
  as: 'files',
  foreignKey: 'caseAssessmentQuestionId'
});

FileMeta.belongsToMany(CaseAssessmentQuestion, {
  through: CaseAssessmentQuestionFile,
  as: 'caseAssessmentQuestions',
  foreignKey: 'fileId'
});
// End

FileMeta.hasOne(CaseAssessmentQuestionFile, {
  foreignKey: 'fileId',
  sourceKey: 'id',
  as: 'caseAssessmentQuestionFile'
});

FileMeta.hasOne(Document, {
  as: 'document',
  sourceKey: 'id',
  foreignKey: 'fileMetaId'
});

CaseAssessmentQuestionFile.hasOne(FileMeta, {
  foreignKey: 'id',
  sourceKey: 'fileId',
  as: 'file'
});

CaseAssessmentQuestionFile.belongsTo(CaseAssessmentQuestion, {
  targetKey: 'id',
  foreignKey: 'caseAssessmentQuestionId',
  as: 'question'
});

CasePhase.belongsTo(AssessmentPhase, {
  targetKey: 'id',
  foreignKey: 'phaseId',
  as: 'phase',
  constraints: false
});

CasePhase.hasMany(CaseReview, {
  foreignKey: 'phaseId',
  as: 'reviews',
  constraints: false
});

CasePhase.hasOne(HospitalResponseType, {
  as: 'hospitalResponseType',
  sourceKey: 'hospitalResponseTypeId',
  foreignKey: 'id'
});

CasePhase.hasOne(CapSubmissionStatus, {
  as: 'capSubmissionStatus',
  sourceKey: 'capSubmissionStatusId',
  foreignKey: 'id'
});

// CaseReview references
CaseReview.belongsTo(CaseAssessment, {
  targetKey: 'id',
  foreignKey: 'caseAssessmentId',
  as: 'caseAssessment',
  constraints: false
});

CaseReview.hasOne(CasePhase, {
  foreignKey: 'id',
  sourceKey: 'phaseId',
  as: 'phases'
});

EventComplaint.hasOne(EventInfo, {
  foreignKey: 'id',
  sourceKey: 'EventInfoId',
  as: 'event'
});

EventComplaint.hasOne(Complaint, {
  foreignKey: 'id',
  sourceKey: 'complaintId',
  as: 'complaint'
});

Hospital.belongsToMany(Address, {
  through: AddressHospital,
  as: 'addresses',
  foreignKey: 'hospitalId'
});

Hospital.hasOne(Case, {
  foreignKey: 'hospitalId',
  sourceKey: 'id',
  as: 'case'
});

Document.belongsTo(Case, {
  targetKey: 'id',
  foreignKey: 'caseId',
  as: 'case',
  constraints: false
});

Case.hasMany(Document, {
  foreignKey: 'caseId',
  as: 'documents'
});

Document.hasOne(FileMeta, {
  as: 'file',
  sourceKey: 'fileMetaId',
  foreignKey: 'id'
});

// A Batch can have many files, even if we just grab the first.
Batch.belongsToMany(FileMeta, {
  through: BatchFile,
  as: 'files',
  foreignKey: 'batchId'
});

FileMeta.belongsToMany(Batch, {
  through: BatchFile,
  as: 'batches',
  foreignKey: 'fileMetaId'
});

//
FileMeta.hasOne(User, {
  as: 'user',
  sourceKey: 'createdBy',
  foreignKey: 'id'
});

// m<->m Batch,Case
Case.belongsToMany(Batch, {
  through: BatchCase,
  as: 'batches',
  foreignKey: 'caseId'
});

Batch.belongsToMany(Case, {
  through: BatchCase,
  as: 'cases',
  foreignKey: 'batchId'
});
// END m<->m Batch,Case

// BatchCase Pivot/Junction table foreign keys
BatchCase.hasOne(Batch, {
  as: 'batch',
  foreignKey: 'id',
  sourceKey: 'batchId'
});

BatchCase.hasOne(Case, {
  as: 'case',
  foreignKey: 'id',
  sourceKey: 'caseId'
});

BatchCase.hasOne(CaseAssessmentFile, {
  as: 'caseAssessmentFile',
  foreignKey: 'id',
  sourceKey: 'caseAssessmentFileId'
});

BatchCase.hasOne(CaseAssessment, {
  foreignKey: 'id',
  sourceKey: 'caseAssessmentId',
  as: 'caseAssessment'
});

CaseAssessment.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status',
  constraints: false
});

CaseAssessment.hasOne(CaseReview, {
  foreignKey: 'id',
  sourceKey: 'reviewId',
  as: 'review',
  constraints: false
});

CaseAssessment.hasOne(CasePhase, {
  foreignKey: 'id',
  sourceKey: 'phaseId',
  as: 'phase',
  constraints: false
});

CaseAssessment.belongsTo(Assessment, {
  targetKey: 'id',
  foreignKey: 'assessmentId',
  as: 'assessment'
});

CaseAssessment.hasMany(CaseAssessmentResponse, {
  foreignKey: 'caseAssessmentId',
  as: 'responses',
  constraints: false
});

CaseAssessment.hasMany(CaseAssessmentFile, {
  foreignKey: 'caseAssessmentId',
  as: 'files'
});

CaseAssessmentFile.hasOne(CaseAssessment, {
  foreignKey: 'id',
  sourceKey: 'caseAssessmentId',
  as: 'caseAssessment'
});

CaseAssessmentResponse.hasOne(CaseAssessment, {
  foreignKey: 'id',
  sourceKey: 'caseAssessmentId',
  as: 'caseAssessment'
});

CaseAssessmentResponse.hasOne(AssessmentQuestion, {
  foreignKey: 'id',
  sourceKey: 'questionId',
  as: 'question'
});

CaseAssessmentResponse.hasOne(Case, {
  foreignKey: 'id',
  sourceKey: 'caseId',
  as: 'case'
});

CaseAssessmentResponse.hasOne(CasePhase, {
  foreignKey: 'id',
  sourceKey: 'phaseId',
  as: 'phase'
});

CaseAssessmentResponse.hasOne(CaseReview, {
  foreignKey: 'id',
  sourceKey: 'reviewId',
  as: 'review'
});

// m<->m Assessment,Shoppable Service Code
Assessment.belongsToMany(ShoppableService, {
  through: AssessmentShoppableService,
  as: 'shoppableServices',
  foreignKey: 'assessmentId'
});

ShoppableService.belongsToMany(Assessment, {
  through: AssessmentShoppableService,
  as: 'assessments',
  foreignKey: 'shoppableServiceCode'
});
// End

// m<->m Case,User
Case.belongsToMany(User, {
  through: CaseUser,
  as: 'users',
  foreignKey: 'caseId'
});

User.belongsToMany(Case, {
  through: CaseUser,
  as: 'cases',
  foreignKey: 'userId'
});
// End

// CaseNote
CaseNote.hasMany(CaseFile, {
  foreignKey: 'caseNoteId',
  as: 'files'
});

//CaseAssessment
CaseAssessment.hasOne(Case, {
  foreignKey: 'id',
  sourceKey: 'caseId',
  as: 'case'
});
