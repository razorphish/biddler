export interface DocumentTable {
  body: any[];
  headers: string[] | { span: number; text: string }[];
}

export interface DocumentFourSomeRow {
  title: string;
  value: string | Date;
}
