-- Campaign Goal
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_DFLT, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'sales', 'cg_sales',  1, 'Sales', 'Get more website sales or sign-ups', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_DFLT, LKP_TITLE, LKP_DESC,  CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'leads', 'cg_leads', 1, 'Leads', 'Get more calls',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_DESC, LKP_TITLE, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'websiteTraffic', 'cg_websiteTraffic', 'Website traffic','Website traffic', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'productBrandConsideration', 'cg_productBrandConsideration', 'Product and brand consideration','Product and brand consideration', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'brandAwarenessAndReach', 'cg_brandAwarenessAndReach', 'Brand awareness and reach', 'Brand awareness and reach', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'appPromotion', 'cg_appPromotion', 'App promotion', 'App promotion', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_DFLT, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'localStoreVisitsAndPromotions', 'cg_localStoreVisitsAndPromotions', 1, 'Local store visits and promitions', 'Local store visits and promotions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_DFLT, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'contentCreator', 'cg_contentCreator', 1, 'Content Creator', 'Direct access to specific content creators', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignGoal', 'none', 'cg_none', 'No goal', 'No goal guidance', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Campaign Type
INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'search', 'ct_search', 'Search','Create text or call ads that show near search results for Biddler.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'display', 'ct_display', 'Display','Run different kinds of ads across Biddler.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'video', 'ct_video', 'Video','Reach and engage viewers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'app', 'ct_app', 'App','Drive app promotion across Biddler''s networks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'smart', 'ct_smart', 'Smart','Reach your business goals with automated ads on Biddler', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'shopping', 'ct_shopping', 'Shopping','Promote yoru products with shopping ads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'toBuy', 'ct_toBuy', 'To Buy','Provide direct to buy ads that allow consumers to purchase your products', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignType', 'local', 'ct_local', 'Local','Drive customers to a physical location', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Campaign Results
	INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignResults', 'visits', 'cr_visits', 'Website visits','Drive customers to a website', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

	INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignResults', 'phone', 'cr_phone', 'Phone calls','Encourage customers to call by phone', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

	INSERT INTO BIDDLER_DB.LKP_INFO (LKP_GRP_NAME, LKP_CD, LKP_ID, LKP_TITLE, LKP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('campaignResults', 'downloads', 'cr_downloads', 'App downloads','Drive customers to download an app', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);