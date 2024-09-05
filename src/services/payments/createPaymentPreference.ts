// services/paymentService.ts

import { apiUrl } from "@/config";

interface PaymentPreferenceData {
  id: string; // product id
  contributionAmount: number;
  name: string;
  email: string;
  message: string;
}

interface PaymentPreference {
  id: string;
  // Add other properties returned by MercadoPago API if needed
}

export async function createPaymentPreference(data: PaymentPreferenceData): Promise<PaymentPreference> {
  try {
    const response = await fetch(`${apiUrl}/payments/preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment preference');
    }

    const preference: PaymentPreference = await response.json();
    return preference;
  } catch (error) {
    console.error('Error creating payment preference:', error);
    throw error;
  }
}
