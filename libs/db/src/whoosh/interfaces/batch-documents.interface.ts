export interface BatchDocument {
  batchId: number;
  batchName: string;
  batchEndDate: Date;
  hospitalName: string;
  hospitalId: number;
  mailingDate: string | Date;
  city: string;
  state: string;
  zip: string;
  zip4: string;
  congressionalDistrict: string;
  documentName: string;
  failures: string;
}
