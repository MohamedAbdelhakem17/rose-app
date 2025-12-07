import { updateAddress } from '@/components/features/address-modal/action/update-address.action';
import { Button } from '@/components/ui/button';
import { ModalState } from '@/lib/types/modal/modal-state';
import { Address } from '@/lib/types/modal/user-address';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type MapAddModalProps = {
  setModal: (_modal: ModalState) => void;
  address: Address;
};
export default function MapAddModal({ setModal, address }: MapAddModalProps) {
  // Translate
  const t = useTranslations();

  // States
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Variables
  const stored = localStorage.getItem('form-modal');
  const formModal: BodyAddModal = stored ? JSON.parse(stored) : null;

  const data = {
    city: formModal.city,
    street: formModal.street,
    phone: formModal.phone,
    lat: '',
    long: '',
  };

  // Functions
  function handleMapClick(event: any) {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setLocation({ lat, lng });
  }

  async function handleSave() {
    if (location) {
      data.lat = location.lat.toString();
      data.long = location.lng.toString();

      if (address?._id) {
        const payload = await updateAddress(address?._id, data);
      }
      setModal('main');
    } else {
      alert('Please select a location first');
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  return (
    <APIProvider apiKey={apiKey}>
      <div className='flex flex-col items-center gap-4'>
        <Map
          style={{ width: '100%', height: '400px', borderRadius: '8px' }}
          defaultCenter={{ lat: 30.0444, lng: 31.2357 }}
          defaultZoom={10}
          onClick={handleMapClick}
        >
          {location && <Marker position={location} />}
        </Map>

        <Button onClick={handleSave} className='mt-4 w-full'>
          {t('update-modal-map-button')}
        </Button>

        {/* Display coordinates */}
        {location && (
          <p className='text-sm text-gray-500'>
            Selected: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </p>
        )}
      </div>
    </APIProvider>
  );
}
