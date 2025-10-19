type ErrorApiProps = {
  error: string;
};

export default function ErrorApi({ error }: ErrorApiProps) {
  return (
    <div className=' text-center border-2 border-dashed bg-red-100  border-maroon-600 text-red-600 py-5 px-2 mb-5'>
      {error}
    </div>
  );
}
