'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/user-address';
import { GetToken } from './action/get-token';
import AddressCard from './components/address-card';
import { useState } from 'react';
import AddContentMap from './components/add-content-map';
import AddAddressStep from './components/steps/add-address-step';
import ModalLayout from './components/layout/modal.layout';

export default function AddressModel() {
  // const token = GetToken()
  // console.log(token);

  // // Fetch
  // const response = await fetch(`${process.env.BASE_URL}/addresses`, {
  //   headers: {
  //     ...API_HEADER,
  //     authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZDAxZDc3ZmVlNjhhNGMyZWI3NzZlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIzMTU5OTV9.B0kx-QA6YLX4RpKAaw0Md27W-wdIOK1qJJKU3M-iyeg',
  //   },
  // });
  // // console.log(response);
  // if (response.ok) {
  //   const payload: ApiResponse<UserAddress> = await response.json();
  //   console.log('-----------------------------\n' + payload);
  // }

  const [content, setContent] = useState<'main' | 'add' | 'update'>('main'); // main | add | update
  return (
    <ModalLayout/>
  );
}
