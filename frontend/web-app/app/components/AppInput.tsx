import { HelperText, TextInput } from 'flowbite-react';
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form';

type Props = {
    label: string;
    type?: string;
    showLabel?: boolean;
} & UseControllerProps

export default function AppInput(props: Props) {
    const { field, fieldState } = useController({...props})

    return (
        <div className='mb-3 block'>
            <TextInput 
                {...props}
                {...field}
                value={field.value || ''}
                type={props.type || ''}
                placeholder={props.label}
                color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
            />
            <HelperText color='failure'>
                { fieldState.error?.message }
            </HelperText>
        </div>
    )
}
