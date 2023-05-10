import { Op } from 'sequelize';
import ComplaintIntake, {
  ComplaintIntakeInput,
  ComplaintIntakeOutput
} from '../../models/complaintIntake.model';
import { AllComplaintIntakeFilters } from './types';

/**
 * @description Gets all complaint intakees
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (
  filters?: AllComplaintIntakeFilters
): Promise<ComplaintIntakeOutput[]> => {
  return ComplaintIntake.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets complaint intake by Id(PK)
 * @author Antonio Marasco
 * @date 03/07/2023
 * @param id Id of complaint intake
 * @returns {*} complaint intake
 */
export const byId = async (id: number): Promise<ComplaintIntakeOutput> => {
  const model = await ComplaintIntake.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates complaint intake
 * @author Antonio Marasco
 * @date 03/07/2023
 * @param payload
 * @returns {*} Newly created complaint intake object
 */
export const create = async (payload: ComplaintIntakeInput): Promise<ComplaintIntakeOutput> => {
  const output = await ComplaintIntake.create(payload);
  return output;
};

/**
 * @description Delete complaint intake by id
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await ComplaintIntake.destroy({ where: { id } });

  return !!deletedCount;
};

/**
 * @description Updates complaint intake
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param id Id of complaint intake to update
 * @param payload complaint intake object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<ComplaintIntakeInput>
): Promise<ComplaintIntakeOutput> => {
  const model = await ComplaintIntake.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
