export enum UserRoles {
  CMS_EXEC = 'CMSEXEC',
  CMS_ADMIN = 'CMSADMIN',

  CMS_QA_ANLYST = 'CMSQAANLYST', // CMS QA Level 2 (52)
  CMS_ANLYST = 'CMSANLYST', // CMS QA Level 1 (57)

  CMPLNC_SPRVSR = 'CMPLNCSPRVSR', // Supervisor Reviewer (53)
  CMPLNC_ANLYST = 'CMPLNCANLYST', // Initial Reviewer  (54)

  INTK_ANLYST = 'INTKANLYST', // Complaint Intake Reviews
  CMPLNC_READR = 'CMPLNCREADR'
}
