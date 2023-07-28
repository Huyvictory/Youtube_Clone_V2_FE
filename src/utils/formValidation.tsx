import { ErrorMessage } from '@hookform/error-message';

const renderFieldValidation = (errors: any, filedname: string) => {
  if (!filedname) return null;

  return (
    <ErrorMessage
      errors={errors}
      name={filedname}
      render={({ message, messages }) => {
        if (messages) {
          return Object.entries(messages).map(([type, message]) => (
            <p key={type}>{message}</p>
          ));
        }
        return <p>{message}</p>;
      }}
    />
  );
};

const hasSpecifiedFieldError = (errorsObj: object, filedname: string): boolean => {
  return Object.hasOwn(errorsObj, filedname);
};

export { hasSpecifiedFieldError, renderFieldValidation };
