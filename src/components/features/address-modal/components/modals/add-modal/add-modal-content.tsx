import { StepState } from '../../../../../../lib/types/modal/step-state';
import FormAddModal from './components/form-add-modal';
import MapAddModal from './components/map-add-modal';

type AddModalContentProps = {
  setStep: (_step: StepState) => void;
  step: StepState;
};
export default function AddModalContent({
  setStep,
  step,
}: AddModalContentProps) {
  
  return(
  <div>
    {step === 'form'? (<FormAddModal setStep={setStep}/>):(<MapAddModal/>)}
  </div>
  )
}
