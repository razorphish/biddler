import { ApiClient, ApiClientOutput } from '../interfaces';

export const toApiClient = (output: ApiClientOutput): ApiClient => {
  const apiClient: ApiClient = {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    applicationId: output.applicationId,
    systemIssuerId: output.systemIssuerId,
    tokenTypeId: output.tokenTypeId,
    clientTypeId: output.clientTypeId,
    statusId: output.statusId,
    userId: output.userId,

    // Attribute(s)
    grants: output.grants,
    applicationName: output.applicationName,
    homepageURL: output.homepageURL,
    clientID: output.clientID,
    clientSecret: output.clientSecret,
    salt: output.salt,
    scopes: output.scopes,
    key: output.key,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };

  delete apiClient['salt'];

  return apiClient;
};
