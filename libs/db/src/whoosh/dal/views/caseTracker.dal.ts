import { ModelStatic, Op } from 'sequelize';

import { CaseTrackerPaginationArgs, CaseTrackerPaginationFindAllOutput } from '../../interfaces';
import CaseTrackerDetailed from '../../views/caseTracker.view';
import CaseTrackerAbbreviated from '../../views/caseTrackerAbbreviated.view';

export const all = async (
  pagination?: CaseTrackerPaginationArgs,
  getAllResults = false
): Promise<CaseTrackerPaginationFindAllOutput> => {
  const { detailed, limit, offset, filters, order, isDeleted, includeDeleted } = pagination;
  const CaseTracker: ModelStatic<CaseTrackerDetailed | CaseTrackerAbbreviated> = detailed
    ? CaseTrackerDetailed
    : CaseTrackerAbbreviated;
  const offsetLimit = getAllResults ? {} : { offset: offset || 0, limit: limit || 20 };

  return Promise.all([
    CaseTracker.findAndCountAll({
      where: {
        ...filters,
        ...(isDeleted && { deletedAt: { [Op.not]: null } })
      },
      ...offsetLimit,
      order: order || [['id', 'DESC']],
      ...((isDeleted || includeDeleted) && { paranoid: false })
    }),
    CaseTracker.count()
  ]).then(([data, totalCount]) => ({ ...data, totalCount }));
};
