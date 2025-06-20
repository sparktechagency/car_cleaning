export interface IFetch {
  status: boolean;
  message: string;
}

export interface IServer {
  id: number;
  car_type: string;
  icon: string;
  interior: number;
  exterior: number;
  both: number;
  time: Array<string>;
  created_at: string;
  updated_at: string;
}

export interface ISingleService extends IFetch {
  data: IServer;
}

export interface ITermsAndConditions {
  id: number;
  type: string;
  text: string;
  created_at: string;
  updated_at: string;
}
export interface IPrivacyPolicy {
  data: ITermsAndConditions;
}

export interface IAboutUs {
  data: ITermsAndConditions;
}

export interface ISupport {
  full_name: string;
  subject: string;
  message: string;
  updated_at: string;
  created_at: string;
  id: number;
}
