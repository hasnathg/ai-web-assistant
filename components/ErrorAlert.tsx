type ErrorAlertProps = {
    error: string;
};

export default function ErrorAlert({ error }: ErrorAlertProps) {
   if (!error) return null;
   
   return (
     <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
      <h2 className="mb-1 text-sm font-semibold text-red-700">Error</h2>
      <p className="text-sm text-red-700">{error}</p>
    </div>
   );
}