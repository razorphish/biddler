import { AccessToken, AccessTokenOutput } from '../interfaces';

export const toAccessToken = (output: AccessTokenOutput): AccessToken => {
  return {
    // Primary Key(s)
    id: output.id,

    // references
    client: output.client,

    // Foreign Key(s)
    userId: output.userId,
    clientId: output.clientId,
    statusId: output.statusId,
    tokenTypeId: output.tokenTypeId,
    schemeTypeId: output.schemeTypeId,

    // Attribute(s)
    token: output.token,
    refreshToken: output.refreshToken,
    scope: output.scope,
    expiresIn: output.expiresIn,
    origin: output.origin,
    forceRefresh: output.forceRefresh,
    ipAddress: output.ipAddress,
    cookie: output.cookie,
    expireDate: output.expireDate,
    refreshTokenExpireDate: output.refreshTokenExpireDate,
    issuedDate: output.issuedDate,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
