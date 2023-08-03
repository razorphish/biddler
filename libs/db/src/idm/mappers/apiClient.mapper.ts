import { ApiClient, ApiClientOutput } from '../interfaces';

export const toApiClient = (output: ApiClientOutput): ApiClient => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    applicationId: output.applicationId,
    systemIssuerId: output.systemIssuerId,
    tokenTypeId: output.tokenTypeId,
    statusId: output.statusId,

    // Attribute(s)
    audience: output.audience,
    subject: output.subject,
    secret: output.secret,
    salt: output.salt,
    scopes: output.scopes,
    allowedIps: output.allowedIps,
    restrictedIps: output.restrictedIps,
    timeToLive: output.timeToLive,
    refreshTimeToLive: output.refreshTimeToLive,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
