import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface FormInputProps extends ChakraInputProps {
  id: string
  label: string
  name: string
  leftAddon?: string | React.ReactNode
  registerOptions?: RegisterOptions
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  leftAddon,
  registerOptions,
  ...props
}) => {
  const { register } = useFormContext()

  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        {leftAddon && (
          <InputLeftAddon id={`${id}-left-addon`}>{leftAddon}</InputLeftAddon>
        )}
        <Input
          id={id}
          data-testid={id}
          {...register(name, registerOptions)}
          {...props}
        />
      </InputGroup>
    </FormControl>
  )
}
