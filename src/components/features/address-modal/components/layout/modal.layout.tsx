'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MODAL_TYPE } from '../../constants/modal.constant';
import AddressCard from '../address-card';
import StateStep from '../state-step';
import AddContentMap from '../add-content-map';
import { useState } from 'react';

export default function ModalLayout() {
  const [modal, setModal] = useState<'add' | 'delete' | 'update' | 'main'>(
    MODAL_TYPE.UPDATE
  );
  const modalType = {
    [MODAL_TYPE.ADD]: {
      header: {
        title: <h1>My Addresses</h1>,
        button: <Button variant={'primary-light'}>Add a New Address</Button>,
        step: null,
      },
      content: {
        // step1: Form,
        // step2: Map,
      },
    },
    [MODAL_TYPE.DELETE]: {
      header: {
        title: <h1>My Addresses</h1>,
        button: <Button variant={'primary-light'}>Add a New Address</Button>,
        step: null,
      },
      content: <AddressCard className=' ' />,
    },
    [MODAL_TYPE.UPDATE]: {
      header: {
        title: <h1>Update My Address</h1>,
        button: null,
        step: <StateStep step={2} />,
      },
      content: {
        // step1: Form,
        step2: <AddContentMap />,
      },
      footer: <Button variant={'primary-light'}>Update Address</Button>,
    },
    [MODAL_TYPE.MAIN]: {
      header: {
        title: <h1>My Addresses</h1>,
        button: <Button variant={'primary-light'}>Add a New Address</Button>,
        step: null,
      },
      content: <AddressCard />,
    },
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'secondary-light'}> Add a New Address </Button>
      </DialogTrigger>
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          {modalType[modal].header.title} {modalType[modal].header.step}
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  );
}
