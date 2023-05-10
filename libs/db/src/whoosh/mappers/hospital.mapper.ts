import { HospitalOutput } from './../models/hospital.model';
import { Hospital } from '../interfaces/hospital.interface';

export const toHospital = (output: HospitalOutput): Hospital => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Keys
    statusId: output.statusId,
    typeId: output.typeId,

    //Attributes
    systemId: output.systemId,
    providerId: output.providerId,
    uniqueId: output.uniqueId,
    name: output.name,
    alternateName: output.alternateName,
    largerHealthSystem: output.largerHealthSystem,
    largerHealthSystemCEO: output.largerHealthSystem,
    largerHealthSystemCEOEmail: output.largerHealthSystemCEOEmail,
    largerHealthSystemPOCName: output.largerHealthSystemPOCName,
    largerHealthSystemPOCEmail: output.largerHealthSystemPOCEmail,
    largerHealthSystemPOCPhone: output.largerHealthSystemPOCPhone,
    pocName: output.pocName,
    pocEmail: output.pocEmail,
    pocPhone: output.pocPhone,
    hospitalCEO: output.hospitalCEO,
    hospitalCEOTitle: output.hospitalCEOTitle,
    hospitalCEOPhone: output.hospitalCEOPhone,
    hospitalCEOEmail: output.hospitalCEOEmail,
    congressionalRepresentative: output.congressionalRepresentative,
    phone: output.phone,
    size: output.size,
    source: output.source,
    sourceDate: output.sourceDate,
    traumaLevel: output.traumaLevel,
    virtualAssistedLungMappingMethod: output.virtualAssistedLungMappingMethod,
    url: output.url,
    naicsCode: output.naicsCode,
    naicsDescription: output.naicsDescription,
    hasHelipad: output.hasHelipad,
    numberBeds: output.numberBeds,
    population: output.population,
    ownerTypeId: output.ownerTypeId,
    x: output.x,
    y: output.y,
    controlType: output.controlType,
    totalStaff: output.totalStaff,
    transactionId: output.transactionId,

    // Timestamps
    createdDate: output.createdDate,
    createdBy: output.createdBy,
    lastUpdatedDate: output.lastUpdatedDate,
    lastUpdatedBy: output.lastUpdatedBy,
    deletedAt: output.deletedAt
  };
};
