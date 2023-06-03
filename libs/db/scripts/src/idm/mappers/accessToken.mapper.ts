import { AccessToken, AccessTokenOutput } from '../interfaces';

export const toAccessToken = (output: AccessTokenOutput): AccessToken => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    userId: output.userId,
    statusId: output.statusId,

    // Attribute(s)
    name: output.name,
    accessToken: output.accessToken,
    timeToLive: output.timeToLive,
    scope: output.scope,
    type: output.type,
    expiresIn: output.expiresIn,
    origin: output.origin,
    forceRefresh: output.forceRefresh,
    cookie: output.cookie,
    ipAddress: output.ipAddress,
    expireDate: output.expireDate,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
