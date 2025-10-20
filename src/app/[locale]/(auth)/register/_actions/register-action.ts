'use server'

import { RegisterFormData } from "@/lib/schemas/auth/register-schema";
import { RegisterResponse } from "@/lib/types/auth";


export async function registerAction(data: RegisterFormData) : Promise<RegisterResponse> {


  const response = await fetch(`${process.env.BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const payload : RegisterResponse = await response.json();
  return payload;
}