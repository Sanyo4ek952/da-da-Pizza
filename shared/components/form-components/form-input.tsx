import { FC, InputHTMLAttributes } from 'react';
import {
  ClearButton,
  ErrorText,
  RequiredSymbol,
} from '@/shared/components/shared';
import { Input } from '@/shared/components/ui';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  // const {} = useFormContext();
  return (
    <div className={className}>
      {label && (
        <p className={'font-medium mb-2'}>
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className={'relative'}>
        <Input className={'h-12 text-md'} {...props} />
        <ClearButton />
      </div>
      <ErrorText text={'Поле обязательное для заполнения'} />
    </div>
  );
};
