import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

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

const hasSpecifiedFieldError = (errorsObj: object, fieldname: string): boolean => {
  if (fieldname.includes('.')) {
    const splitNestedField = fieldname.split('.');

    return _.has(errorsObj, `${splitNestedField[0]}.${splitNestedField[1]}`);
  }

  return Object.hasOwn(errorsObj, fieldname);
};

export { hasSpecifiedFieldError, renderFieldValidation };
