import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { get } from 'lodash'

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
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, name)
  const fieldErrorMessage =
    fieldError && typeof fieldError.message === 'string'
      ? fieldError.message
      : undefined

  return (
    <FormControl isInvalid={!!fieldErrorMessage}>
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
      {fieldErrorMessage && (
        <FormErrorMessage>{fieldErrorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
