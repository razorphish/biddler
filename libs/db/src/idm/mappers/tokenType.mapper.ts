import { TokenType, TokenTypeOutput } from '../interfaces';

export const toTokenType = (output: TokenTypeOutput): TokenType => {
  return {
    // Primary Key(s)
    id: output.id,

    // Attribute(s)
    description: output.description,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
