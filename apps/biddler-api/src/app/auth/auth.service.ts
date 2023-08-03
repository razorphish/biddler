/**
 * --------------------------------------------------------
 * @file Service Layer: Report
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { BIDDLER_IDM } from '@biddler/db';

@Injectable()
export class AuthService {
  all(filters: HPT.types.AllReportFilters): Promise<HPT.interfaces.ReportOutput[]> {
    const queryFilters = {
      attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return HPT.dal.Report.all(queryFilters);
  }

  byId(id: number): Promise<HPT.interfaces.ReportOutput> {
    return HPT.dal.Report.byId(id);
  }

  create(payload: HPT.interfaces.ReportInput): Promise<HPT.interfaces.ReportOutput> {
    return HPT.dal.Report.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return HPT.dal.Report.deleteById(id);
  }

  paginate(
    filters: HPT.types.AllReportFilters
  ): Promise<{ rows: HPT.interfaces.ReportOutput[]; count: number }> {
    return HPT.dal.Report.paginate(filters);
  }

  update(
    id: number,
    payload: Partial<HPT.interfaces.ReportInput>
  ): Promise<HPT.interfaces.ReportOutput> {
    return HPT.dal.Report.update(id, payload);
  }
}
