"use client";

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="pt-2 text-rose-500 text-small-regular">
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
