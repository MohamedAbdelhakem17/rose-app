import { StepState } from '@/lib/types/modal/step-state';
import FormUpdateModal from './components/form-update-modal';
import MapUpdateModal from './components/map-update-modal';
import { Address } from '@/lib/types/modal/user-address';
import { ModalState } from '@/lib/types/modal/modal-state';

type UpdateModalProps = {
  step: StepState;
  setStep: (_step: StepState) => void;
  setModal: (_step: ModalState) => void;
  address: Address;
};
export default function UpdateModalContent({
  step,
  setStep,
  address,
  setModal,
}: UpdateModalProps) {
  return (
    <div>
      {step === 'form' ? (
        <FormUpdateModal setStep={setStep} />
      ) : (
        <MapUpdateModal address={address} setModal={setModal} />
      )}
    </div>
  );
}
