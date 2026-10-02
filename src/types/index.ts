export type Role = 'citizen' | 'collector' | 'admin';
export type WasteType = 'Plastic' | 'Organic' | 'E-Waste' | 'Metal' | 'Glass' | 'Mixed Waste';
export type Urgency = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface WasteRequest {
  id: string;
  citizen_id: string;
  title: string;
  description: string;
  waste_type: WasteType;
  urgency: Urgency;
  quantity: string;
  address: string;
  lat: number;
  lng: number;
  image_url?: string;
  status: Status;
  priority_score: number;
  created_at: string;
  updated_at: string;
}
