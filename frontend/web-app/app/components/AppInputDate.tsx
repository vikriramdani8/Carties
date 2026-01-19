// import { DatepickerProps } from 'flowbite-react';
import { useController, UseControllerProps } from 'react-hook-form';
import { DatePicker, DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HelperText } from 'flowbite-react';

type Props = {
    label: string;
    type?: string;
} & UseControllerProps & DatePickerProps

export default function AppInputDate(props: Props) {
    const { field, fieldState } = useController({ ...props })

    return (
        <div className='mb-3 block'>
            <DatePicker
                {...props}
                {...field}
                selected={field.value}
                onChange={(value: any) => field.onChange(value)}
                className={
                    `
                        rounded-lg
                        w-full
                        border
                        p-2
                        border-gray-600
                        flex flex-col
                        ${fieldState.error ? 'bg-red-50 border-red-500 text-red-900' :
                        (!fieldState.invalid && fieldState.isDirty) ? 'bg-green-50 border-green-500' : ''}
                    `
                }
            />
            <HelperText color='failure'>
                {fieldState.error?.message}
            </HelperText>
        </div>
    )
}
