
import React from 'react';

export interface Course {
  // Fix: Changed type from React.ReactElement to React.JSX.Element to solve a type inference issue with React.cloneElement.
  icon: React.JSX.Element;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  outcomes: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  course: string;
  avatarUrl: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export enum FormStatus {
  Idle,
  Loading,
  Success,
  Error,
}

export interface FAQItem {
  question: string;
  answer: string;
}
