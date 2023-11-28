-- Status Lookups
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'active', 'st_active','Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'archived', 'st_archived', 'Archived', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'cancelled', 'st_cancelled', 'Cancelled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'closed', 'st_closed','Closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'completed', 'st_completed','Completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'deleted', 'st_deleted','Deleted', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'draft', 'st_draft','Draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'expired', 'st_expired','Expired', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'failed', 'st_failed','Failed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'in progress', 'st_in progress', 'In Progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'new', 'st_new','New', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'open', 'st_open','Open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'pending', 'st_pending','Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'processing','st_processing', 'Processing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'reviewed', 'st_reviewed','Record has been reviewed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'revoked', 'st_revoked', 'Revoked', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'suspended', 'st_suspended', 'Suspended', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('status', 'under construction', 'st_under construction', 'Under Construction', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

  -- TOKEN TYPE:: ACS_TOKN
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'jwt', 'tt_jwt', 'Self-signed JWT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'access', 'tt_access', 'Access Token', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'id', 'tt_id', 'ID Token', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'refresh', 'tt_refresh', 'Refresh Token', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'bearer', 'tt_bearer', 'Bearer Token', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenType', 'federated', 'tt_federated', 'Federated Token', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Scheme Type : ACS_TKN
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenSchemeType', 'ascii', 'tst_ascii', 'ASCII', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('tokenSchemeType', 'pci', 'tst_pci', 'PCI ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- OAuth Client Type
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthClientType', 'confidential', 'oct_confidential', 'oauth 2.0 client type: confidential', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthClientType', 'public', 'oct_public', 'oauth 2.0 client type: public ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

	-- OAuth grant type
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'implicit', 'ogt_implicit', 'oauth 2.0 grant type: implicit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'authorization_code', 'ogt_authorization_code', 'oauth 2.0 grant type: authorization_code ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'client_credentials', 'ogt_client_credentials', 'oauth 2.0 grant type: client_credentials ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'password', 'ogt_password', 'oauth 2.0 grant type: password ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'refresh_token', 'ogt_refresh_token', 'oauth 2.0 grant type: refresh_token ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	INSERT INTO BIDDLER_IDM_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES('oauthGrantType', 'urn:ietf:params:oauth:grant-type:device_code', 'ogt_device', 'oauth 2.0 grant type: device ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- System Info
INSERT INTO BIDDLER_IDM_DB.SYS_INFO
(SYS_ID, STUS_LKP_ID, SYS_NAME, SYS_NAME_SLUG, SYS_DESC, SYS_URL, EFCTV_STRT_DT, EFCTV_END_DT, CREATD_DT, CREATD_BY, LAST_UPDATD_DT, LAST_UPDATD_BY, DLTD_AT)
VALUES(1, 'st_active', 'BiddlerApi', 'biddler-api', 'The api for the biddler application', 'localhost:8080/v1', '2023-01-01 00:00:00', '2024-01-01 00:00:00', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', NULL);

INSERT INTO BIDDLER_IDM_DB.SYS_ISSUER
(SYS_ISSUER_ID, SYS_ID, STUS_LKP_ID, TOKN_TYP_LKP_ID, ISSUER_NAME, TKN_TTL, RFRSH_TKN_TTL, HASH_ALGORITHM, ORIGIN, RESTRICTED_IPS, ALLOWED_IPS, METHODS, ALLOWED_HEADERS, EXPOSED_HEADERS, ALLOW_CREDENTIALS, MAX_AGE_SECONDS, CREATD_DT, CREATD_BY, LAST_UPDATD_DT, LAST_UPDATD_BY, DLTD_AT)
VALUES(1, 1, 'st_active', 'tt_jwt', 'magic', 60, 259200, 'HS256', '*', NULL, NULL, 'GET,POST,PUT,PATCH', NULL, NULL, 1, 60, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', NULL);

-- Application
INSERT INTO BIDDLER_IDM_DB.APLCTN_INFO
(STUS_LKP_ID, APLCTN_NAME, APLCTN_DESC, CREATD_DT, CREATD_BY, LAST_UPDATD_DT, LAST_UPDATD_BY)
VALUES('st_active', 'Biddler', 'Biddler''s tweet', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');

-- USER
INSERT INTO BIDDLER_IDM_DB.USER_INFO
(USER_ID, STUS_LKP_ID, FIRST_NAME, LAST_NAME, USER_NAME, EMAIL, SALT, PWD, CREATD_DT, CREATD_BY, LAST_UPDATD_DT, LAST_UPDATD_BY, DLTD_AT)
VALUES(1, 'st_active', 'Antonio', 'Marasco', 'antonio@maras.co', 'antonio@maras.co', '$2b$10$PEZtCKa0amXWylzcpy84Ou', '$2b$10$PEZtCKa0amXWylzcpy84Ou04w.Ugh/J2zMCjOYLS7m7VLoIZ1RnHu', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', NULL);

-- Api Client
INSERT INTO BIDDLER_IDM_DB.API_CLIENT
(API_CLIENT_ID, USER_ID, APLCTN_ID, SYS_ISSUER_ID, TOKN_TYP_LKP_ID, CLIENT_TYP_LKP_ID, GRANT_TYP_LKP_ID, STUS_LKP_ID, APP_NAME, HOME_PG_URL, AUTH_URLS_REDRCT, CLIENT_ID, CLIENT_SECRET_HASH, SALT, SCOPES, CREATD_DT, CREATD_BY, LAST_UPDATD_DT, LAST_UPDATD_BY, DLTD_AT)
VALUES(1, 1, 1, 1, 'tt_access', 'oct_confidential', 'ogt_password', 'st_active', 'Biddler.production', 'www.myhomepage.com', NULL, 'c1160f72-779d-4627-af24-03994338d4c9', '7c05054f3c00b67d1c72d480d18f7da752a60b323e83793c5bb6acf7d424879b9b8e4feb63f54bb2940143b33f17db5fdeb983aaec1f26bad5e1836ce9aaaca9.e49be936a352880bb2230c2bb1e23726', 'e49be936a352880bb2230c2bb1e23726', NULL, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', NULL);