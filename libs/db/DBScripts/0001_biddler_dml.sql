-- Address Type lookups
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'home', 'at_home', 'Home', 'Home Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'business', 'at_business', 'Business', 'Business Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'billing', 'at_billing', 'Billing', 'Billing Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'shipping', 'at_shipping', 'Shipping', 'Shipping Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'contract', 'at_contact', 'Contract', 'Contract Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'ar', 'at_ar', 'Accounts Receivable', 'Accounts Receivable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'recipient', 'at_recipient', 'Recipient', 'Recipient Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'poBox', 'at_poBox', 'PO Box', 'Post Office Box Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'school', 'at_school', 'School', 'School Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'military', 'at_military', 'Military', 'Military Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'international', 'at_international', 'Internatinoal', 'International Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'mailing', 'at_mailling', 'mailing', 'Mailing Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('addressType', 'physical', 'at_physical', 'phyisical', 'Physical Address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Status Lookups
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'active', 'st_active','Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'archived', 'st_archived', 'Archived', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'cancelled', 'st_cancelled', 'Cancelled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'closed', 'st_closed','Closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'completed', 'st_completed','Completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'deleted', 'st_deleted','Deleted', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'draft', 'st_draft','Draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'expired', 'st_expired','Expired', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'failed', 'st_failed','Failed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'in progress', 'st_in progress', 'In Progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'new', 'st_new','New', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'open', 'st_open','Open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'pending', 'st_pending','Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'processing','st_processing', 'Processing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'reviewed', 'st_reviewed','Record has been reviewed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'revoked', 'st_revoked', 'Revoked', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'suspended', 'st_suspended', 'Suspended', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'under construction', 'st_under construction', 'Under Construction', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
