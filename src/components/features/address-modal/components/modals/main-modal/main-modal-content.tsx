import { ModalState } from '@/lib/types/modal/modal-state';
import AddressCard from '../../address-card';
import { useState } from 'react';
import DeleteModal from '../delete-modal/delete-modal';
import { useAddresses } from '@/lib/apis/modal/get-addresses';
import AddressModalSkeleton from '@/components/skeletons/address-modal/address-modal.skeleton';
import { Address } from '@/lib/types/modal/user-address';

type MainModalContentProps = {
  setModal: (_modal: ModalState) => void;
  address: Address;
  setAddress: (_address: Address) => void;
};
export default function MainModalContent({
  setModal,
  address,
  setAddress,
}: MainModalContentProps) {
  //
  const { data, isLoading, isError } = useAddresses();
  if (data?.message !== 'success') {
    console.log(data?.message);
  }

  const [isPopup, setIsPopup] = useState<boolean>(false);

  if (isLoading) return <AddressModalSkeleton />;
  if (isError) return <p>Failed to load addresses</p>;
  return (
    <div className='relative scroll-smooth overflow-scroll overflow-x-hidden h-96 px-6'>
      {data?.addresses.map(address => (
        <AddressCard
          setModal={setModal}
          data={address}
          setIsPopup={setIsPopup}
          setAddress={setAddress}
        />
      ))}
      {isPopup && <DeleteModal setIsPopup={setIsPopup} address={address} />}
    </div>
  );
}
