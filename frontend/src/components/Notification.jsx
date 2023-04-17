
export const ErrorAlert = ({ message }) => {
  if (message !== null) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>;
  }
  return null;
};

export const SuccessAlert = ({ message }) => {
  if (message !== null) {
    return <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>;
  }
  return null;
};