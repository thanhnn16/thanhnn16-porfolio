export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name: string;
  email: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
} 