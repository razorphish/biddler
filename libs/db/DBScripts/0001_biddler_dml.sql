INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('home','Home Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('business','Business Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('billing','Billing Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('shipping','Shipping Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('contract','Contract Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('ar','Accounts Receivable', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('recipient','Recipient Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('poBox','Post Office Box Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('school','School Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('military','Military Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('international','International Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('mailing','Mailing Address', CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_DB.ADDR_TYPE_LKP (ADDR_TYPE_CD,ADDR_TYPE_DESC,CREATD_DT)
	VALUES ('physical','Physical Address', CURRENT_TIMESTAMP);


INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('active', 'Active', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('archived', 'Archived', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('cancelled', 'Cancelled', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('closed', 'Closed', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('completed', 'Completed', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('deleted', 'Deleted', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('draft', 'Draft', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('expired', 'Expired', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('failed', 'Failed', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('in progress', 'In Progress', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('new', 'New', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('open', 'Open', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('pending', 'Pending', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('processing', 'Processing', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('reviewed', 'Record has been reviewed', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('revoked', 'Revoked', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('suspended', 'Suspended', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO BIDDLER_DB.STUS_TYPE_LKP
(STUS_TYPE_CD, STUS_TYPE_DESC, CREATD_DT, CREATD_BY)
VALUES('under construction', 'Under Construction', CURRENT_TIMESTAMP, 'SYSTEM');