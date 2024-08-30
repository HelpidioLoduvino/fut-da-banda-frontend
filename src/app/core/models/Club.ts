export interface Club {
  id: number;
  name: string;
  abv: string;
  province: string;
  emblem: string;
  status: string;
  description: string;
  competition: string;
  category: string;
  gender: string;
  admissionTest?: string;
  players: any[];

}
