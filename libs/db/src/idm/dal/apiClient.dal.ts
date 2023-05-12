// import { Op } from 'sequelize';
// import ApiClient, { ApiClientOutput } from '../models/apiClient.model';
// import { AllApiClientFilters } from './types';

// export const all = async (
//   filters?: AllApiClientFilters
// ): Promise<ApiClientOutput[]> => {
//   return ApiClient.findAll({
//     where: {
//       ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
//     },
//     ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
//   });
// };
