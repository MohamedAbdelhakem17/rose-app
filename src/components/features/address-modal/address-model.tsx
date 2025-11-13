import ModalLayout from './components/layout/modal.layout';

export default function AddressModel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalLayout>{children}</ModalLayout>;
}
