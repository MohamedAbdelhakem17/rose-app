import { Button } from '@/components/ui/button';
import { ModalState } from '../../../../../../lib/types/modal/modal-state';
import { useTranslations } from 'next-intl';

type MainModalHeaderPros = {
  setModal: (_modal: ModalState) => void;
};
export default function MainModalHeader({ setModal }: MainModalHeaderPros) {
  // Translate
  const t = useTranslations();
  return (
    <div className=' flex justify-between items-center w-full mb-6'>
      <h1 className=' font-bold text-3xl'> {t('main-modal-header')} </h1>
      <Button variant={'primary-light'} onClick={() => setModal('add')}>
        {t('main-modal-button')}
      </Button>
    </div>
  );
}
