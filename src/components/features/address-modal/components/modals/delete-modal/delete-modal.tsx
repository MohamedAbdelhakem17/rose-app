import { Button } from '@/components/ui/button';
import { Address } from '@/lib/types/modal/user-address';
import { Trash, X } from 'lucide-react';
import { deleteAddress } from '../../../action/delete-address.action';

type DeleteModalProps = {
  setIsPopup: (_isPopup: boolean) => void;
  address: Address;
};
export default function DeleteModal({ setIsPopup, address }: DeleteModalProps) {
  // Function
  async function deleteConfirm() {
    if (address) {
      const payload = await deleteAddress(address?._id);
    }
  }
  return (
    <div className='absolute bottom-1/4 left-1/4 right-1/4 flex flex-col gap-6 justify-center items-center bg-white p-6 border border-zinc-500 rounded-2xl'>
      <X
        className=' absolute top-3 right-3 cursor-pointer'
        onClick={() => setIsPopup(false)}
      />
      <div className='flex justify-center w-5 h-5 items-center p-6 bg-zinc-500/10 rounded-full'>
        <div className='flex justify-center items-center p-6 bg-zinc-500/15 rounded-full'>
          <Trash size={29} />
        </div>
      </div>
      <p>Are you sure you want to delete this address?</p>
      <div className=' flex justify-between items-center w-full'>
        <Button variant={'ghost'} onClick={() => setIsPopup(false)}>
          Cancel
        </Button>
        <Button variant={'destructive'} onClick={deleteConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
