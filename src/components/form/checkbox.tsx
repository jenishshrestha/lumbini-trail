import { ChangeEventHandler } from 'react';

interface CheckBoxTypes {
  id: string;
  label: string;
  status: boolean;
  handleChange?: ChangeEventHandler;
}

const Checkbox = ({ id, label, status, handleChange }: CheckBoxTypes) => {
  return (
    <div className='field-checkbox'>
      <input
        id={id}
        type='checkbox'
        name={id}
        defaultChecked={status}
        onChange={handleChange}
        className=''
      />
      <label htmlFor={id} className=''>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
