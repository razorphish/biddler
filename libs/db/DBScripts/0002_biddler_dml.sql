
INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, CAMPGN_GOAL_DFLT, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC,CREATD_DT, LAST_UPDATD_DT)
	VALUES ('sales', 1, 'active','Sales','Get more website sales or sign-ups',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, CAMPGN_GOAL_DFLT, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC,CREATD_DT, LAST_UPDATD_DT)
	VALUES ('leads', 1, 'active','Leads','Get more calls',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC,CREATD_DT, LAST_UPDATD_DT)
	VALUES ('websiteTraffic', 'active','Website traffic','Website traffic',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('productBrandConsideration','active','Product and brand consideration','Product and brand consideration',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC,CREATD_DT, LAST_UPDATD_DT)
	VALUES ('brandAwarenessAndReach','active','Brand awareness and reach','Brand awareness and reach',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('appPromotion','active','App promotion','App promition',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, CAMPGN_GOAL_DFLT, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('localStoreVisitsAndPromotions', 1, 'active','Local store visits and promitions','Local store visits and promotions',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, CAMPGN_GOAL_DFLT, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('contentCreator', 1, 'active','Content Creator','Direct access to specific content creators',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_GOAL_LKP (CAMPGN_GOAL_ID, STUS_TYPE_CD,CAMPGN_GOAL_TITLE,CAMPGN_GOAL_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('none','active','No goal','No goal guidance',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


-- Campaign Type
INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('search','active','Search','Create text or call ads that show near search results for Biddler.com',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('display','active','Display','Run different kinds of ads across Biddler.com',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('video','active','Video','Reach and engage viewers',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('app','active','App','Drive app promotion across Biddler''s networks',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('smart','active','Smart','Reach your business goals with automated ads on Biddler',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('shopping','active','Shopping','Promote yoru products with shopping ads',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('toBuy','active','To Buy','Provide direct to buy ads that allow consumers to purchase your products',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO BIDDLER_DB.CAMPGN_TYP_LKP (CAMPGN_TYP_CD, STUS_TYPE_CD,CAMPGN_TYP_TITLE,CAMPGN_TYP_DESC, CREATD_DT, LAST_UPDATD_DT)
	VALUES ('local','active','Local','Drive customers to a physical loction',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);