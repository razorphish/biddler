

CREATE TABLE BIDDLER_DB.CAMPGN_GOAL_LKP (
  CAMPGN_GOAL_ID    VARCHAR(32)   NOT NULL,
  STUS_TYPE_CD      VARCHAR(32)   NOT NULL,
  CAMPGN_GOAL_TITLE VARCHAR(128)   DEFAULT NULL,
  CAMPGN_GOAL_DESC  VARCHAR(256)  DEFAULT NULL,
  CAMPGN_GOAL_DFLT  BOOLEAN       DEFAULT 0,
  CREATD_DT       DATETIME NOT NULL, 
  CREATD_BY       VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  LAST_UPDATD_DT  DATETIME NOT NULL, 
  LAST_UPDATD_BY  VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  DLTD_AT         DATETIME NULL DEFAULT NULL, 
	CONSTRAINT CAMPGN_GOAL_LKP_PK PRIMARY KEY (CAMPGN_GOAL_ID),
	CONSTRAINT CAMPGN_GOAL_LKP_FK FOREIGN KEY (STUS_TYPE_CD) REFERENCES BIDDLER_DB.STUS_TYPE_LKP(STUS_TYPE_CD)
);

CREATE TABLE BIDDLER_DB.CAMPGN_TYP_LKP (
  CAMPGN_TYP_CD       VARCHAR(32)   NOT NULL,
  STUS_TYPE_CD        VARCHAR(32)   NOT NULL,
  CAMPGN_TYP_TITLE VARCHAR(128)   DEFAULT NULL,
  CAMPGN_TYP_DESC  VARCHAR(256)  DEFAULT NULL,
  CAMPGN_TYP_DFLT  BOOLEAN       DEFAULT 0,
  CREATD_DT       DATETIME NOT NULL, 
  CREATD_BY       VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  LAST_UPDATD_DT  DATETIME NOT NULL, 
  LAST_UPDATD_BY  VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  DLTD_AT         DATETIME NULL DEFAULT NULL, 
	CONSTRAINT CAMPGN_TYP_LKP_PK PRIMARY KEY (CAMPGN_TYP_CD),
	CONSTRAINT CAMPGN_TYP_LKP_FK FOREIGN KEY (STUS_TYPE_CD) REFERENCES BIDDLER_DB.STUS_TYPE_LKP(STUS_TYPE_CD)
);

CREATE TABLE BIDDLER_DB.CAMPGN_INFO (
	CMPGN_ID        INT auto_increment NOT NULL,
	USER_ID         INT NOT NULL,
  CAMPGN_GOAL_ID  VARCHAR(32) NOT NULL,
  CAMPGN_TYP_CD   VARCHAR(32) NOT NULL,
	STUS_TYPE_CD    VARCHAR(32) NOT NULL,
  CMPGN_NAME      VARCHAR(128) NOT NULL, 
  EFCTV_STRT_DT   DATE DEFAULT NULL,
  EFCTV_END_DT    DATE DEFAULT NULL,
  CREATD_DT       DATETIME NOT NULL, 
  CREATD_BY       VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  LAST_UPDATD_DT  DATETIME NOT NULL, 
  LAST_UPDATD_BY  VARCHAR(48) NULL DEFAULT 'SYSTEM', 
  DLTD_AT         DATETIME NULL DEFAULT NULL, 
	CONSTRAINT CAMPGN_INFO_PK   PRIMARY KEY (CMPGN_ID),
  CONSTRAINT CAMPGN_INFO_FK   FOREIGN KEY (STUS_TYPE_CD)    REFERENCES BIDDLER_DB.STUS_TYPE_LKP(STUS_TYPE_CD),
	CONSTRAINT CAMPGN_INFO_FK_1 FOREIGN KEY (USER_ID)         REFERENCES BIDDLER_DB.USER_INFO(USER_ID),
  CONSTRAINT CAMPGN_INFO_FK_2 FOREIGN KEY (CAMPGN_GOAL_ID)  REFERENCES BIDDLER_DB.CAMPGN_GOAL_LKP(CAMPGN_GOAL_ID),
  CONSTRAINT CAMPGN_INFO_FK_3 FOREIGN KEY (CAMPGN_TYP_CD)   REFERENCES BIDDLER_DB.CAMPGN_TYP_LKP(CAMPGN_TYP_CD)
);
