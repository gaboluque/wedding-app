import React, { useState, FormEvent, useCallback } from 'react';
import { formatCurrency } from "@/utils/currencyUtils";

interface FormData {
  contribution: string;
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  contribution?: string;
  name?: string;
  email?: string;
  message?: string;
}

interface CheckoutFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  remainingAmount: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
                                                            remainingAmount,
                                                            onSubmit,
                                                            loading
                                                          }) => {
  const [formData, setFormData] = useState<FormData>({
    contribution: '',
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [contribution, setContribution] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.contribution) newErrors.contribution = 'La contribución es requerida';
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo electrónico inválido';
    if (!formData.message) newErrors.message = 'El mensaje es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, contribution });
    }
  };

  const handleContributeRemaining = useCallback(() => {
    setContribution(formatCurrency(remainingAmount));
    handleChange({ target: { name: 'contribution', value: formatCurrency(remainingAmount) } } as any);
  }, [remainingAmount]);

  const handleContributionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = Number(value);
    setContribution(formatCurrency(numericValue));
    handleChange(e);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">
          Contribución
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="contribution"
            name="contribution"
            value={contribution}
            onChange={handleContributionChange}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            placeholder="Cuánto quieres contribuir al regalo?"
          />
          <button
            type="button"
            onClick={handleContributeRemaining}
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm"
          >
            Contribuir el restante
          </button>
        </div>
        {errors.contribution && <p className="mt-2 text-sm text-red-600">{errors.contribution}</p>}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="¡Dejale un mensaje a los novios!"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
        {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Procesando...' : 'Contribuir'}
        </button>
      </div>
    </form>
  );
};
