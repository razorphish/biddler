import { AddressType, AddressTypeOutput } from '../interfaces';

export const toAddressType = (output: AddressTypeOutput): AddressType => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)

    // Attribute(s)
    description: output.description,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
