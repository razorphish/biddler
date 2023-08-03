import { SystemIssuer, SystemIssuerOutput } from '../interfaces';

export const toSystemIssuer = (output: SystemIssuerOutput): SystemIssuer => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    systemId: output.systemId,
    statusId: output.statusId,
    tokenTypeId: output.tokenTypeId,

    // Attribute(s)
    name: output.name,
    tokenTimeToLive: output.tokenTimeToLive,
    refreshTokenTimeToLive: output.refreshTokenTimeToLive,
    hashAlgorithm: output.hashAlgorithm,
    origin: output.origin,
    restrictedIps: output.restrictedIps,
    allowedIps: output.allowedIps,
    methods: output.methods,
    allowedHeaders: output.allowedHeaders,
    exposedHeaders: output.exposedHeaders,
    allowCredentials: output.allowCredentials,
    maxAgeInSeconds: output.maxAgeInSeconds,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
