export interface dataType {
  name: string;
  link: string;
  shortLink: string;
}

export type mainTableProps = {
  name: string;
  link: string;
  shortLink: string;
  clicks: number;
  dateCreated: Date;
}[];
