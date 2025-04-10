export interface OrderData {
        id: number;
        make: string; // Add this property
        model: string;
        year: number;
        customer: string;
        requestDate: string;
        startedDate: string;
        technician: string;
        billTotal: number;
        services: {
          id: number;
          name: string;
          notes: string;
        }[];
      }
    // id?: number;
    // service_name: string;
    // price: number;
    // service_date: number;
    // user_id: number;
    // employee_id: number;
    
} 