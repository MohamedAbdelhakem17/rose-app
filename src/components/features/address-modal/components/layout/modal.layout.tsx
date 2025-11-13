'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MODAL_TYPE } from '../../constants/modal.constant';
import { useState } from 'react';
import { ModalState } from '../../../../../lib/types/modal/modal-state';
import MainModalHeader from '../modals/main-modal/main-modal-header';
import MainModalContent from '../modals/main-modal/main-modal-content';
import { StepState } from '../../../../../lib/types/modal/step-state';
import AddModalHeader from '../modals/add-modal/add-modal-header';
import AddModalContent from '../modals/add-modal/add-modal-content';
import UpdateModalContent from '../modals/update-modal/update-modal-content';
import UpdateModalHeader from '../modals/update-modal/update-modal-header';
import { Address } from '@/lib/types/modal/user-address';

export default function ModalLayout({ children }: { children: any }) {
  // States
  // Modal state
  const [modal, setModal] = useState<ModalState>(MODAL_TYPE.MAIN);

  // Step state
  const [step, setStep] = useState<StepState>('form');

  // Address state
  const [address, setAddress] = useState<Address>();

  // Variables
  const modalType = {
    [MODAL_TYPE.MAIN]: {
      header: <MainModalHeader setModal={setModal} />,
      content: (
        <MainModalContent
          setModal={setModal}
          address={address}
          setAddress={setAddress}
        />
      ),
    },
    [MODAL_TYPE.ADD]: {
      header: <AddModalHeader step={step} setStep={setStep} />,
      content: <AddModalContent step={step} setStep={setStep} />,
    },
    [MODAL_TYPE.UPDATE]: {
      header: <UpdateModalHeader step={step} setStep={setStep} />,
      content: (
        <UpdateModalContent step={step} setStep={setStep} address={address} />
      ),
    },
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        {/* Header */}
        <DialogHeader>{modalType[modal].header}</DialogHeader>
        {/* Content */}
        {modalType[modal].content}
      </DialogContent>
    </Dialog>
  );
}
