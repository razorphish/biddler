import { FileMetaOutput } from '../models/fileMeta.model';
import { FileMeta } from '../interfaces/_index';

export const toFileMeta = (output: FileMetaOutput): FileMeta => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)
    docTypeId: output.docTypeId,
    statusId: output.statusId,

    // Attribute(s)
    originalFileName: output.originalFileName,
    displayName: output.displayName,
    targetFilename: output.targetFilename,
    targetLocation: output.targetLocation,
    fileSize: output.fileSize,
    fileStatus: output.fileStatus,
    fileExtension: output.fileExtension,
    details: output.details,
    fileInfoJson: output.fileInfoJson,

    // Timestamps
    createdDate: output.createdDate,
    createdBy: output.createdBy,
    lastUpdatedDate: output.lastUpdatedDate,
    lastUpdatedBy: output.lastUpdatedBy,
    deletedAt: output.deletedAt
  };
};
