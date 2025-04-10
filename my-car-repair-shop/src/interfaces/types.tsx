// src/interfaces/types.ts
export interface OrderData {
    id: number;
    service_name: string;
    price: number;
    service_date: string;
    user_id: number;
    employee_id?: number;
    parts: PartData[];
  }
  
  export interface PartData {
    id: number;
    part_number: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface OrderPostData {
    service_name: string;
    price: number;
    service_date: string;
    user_id: number;
    parts: number[];
  }