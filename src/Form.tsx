import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema'
import { FormData } from './types/FormData'
import { PriceType } from './types/PriceType'
import { Radio, RadioGroup, Button, Box, Stack, VStack } from '@chakra-ui/react'
import { FormInput } from './ui/FormInput'

export const Form = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: { type: PriceType.Range } },
  })

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const saveData = (data: FormData) => {
    console.log(data)
  }

  const priceType = watch('price.type')

  return (
    <FormProvider {...methods}>
      <Box maxW="lg" mx="auto" p={{ base: 4, md: 8 }}>
        <form onSubmit={handleSubmit(saveData)}>
          <VStack spacing={4} align="stretch">
            <FormInput
              id="name"
              label="Name"
              name="name"
              autoFocus
              isDisabled={isSubmitting}
              autoComplete="name"
            />
            <FormInput
              id="email"
              label="Email"
              name="email"
              isDisabled={isSubmitting}
              autoComplete="email"
            />
            <RadioGroup defaultValue={priceType}>
              <Stack direction="row" spacing={4}>
                <Radio
                  id="fixed"
                  value={PriceType.Fixed}
                  {...methods.register('price.type')}
                  data-testid="fixed-type"
                >
                  Fixed
                </Radio>
                <Radio
                  id="range"
                  value={PriceType.Range}
                  {...methods.register('price.type')}
                  data-testid="range-type"
                >
                  Range
                </Radio>
              </Stack>
            </RadioGroup>
            {priceType === PriceType.Fixed && (
              <FormInput
                id="fixed-amount"
                label="Amount"
                name="price.amount"
                type="number"
                leftAddon="$"
                step="0.01"
                registerOptions={{ valueAsNumber: true }}
                isDisabled={isSubmitting}
              />
            )}
            {priceType === PriceType.Range && (
              <Stack
                spacing={4}
                direction={{ base: 'column', md: 'row' }}
                width="100%"
              >
                <FormInput
                  id="min-amount"
                  label="Min"
                  name="price.amount.min"
                  type="number"
                  leftAddon="$"
                  step="0.01"
                  registerOptions={{ valueAsNumber: true }}
                  isDisabled={isSubmitting}
                />
                <FormInput
                  id="max-amount"
                  label="Max"
                  name="price.amount.max"
                  type="number"
                  leftAddon="$"
                  step="0.01"
                  registerOptions={{ valueAsNumber: true }}
                  isDisabled={isSubmitting}
                />
              </Stack>
            )}
            <Button
              type="submit"
              data-testid="submit-button"
              colorScheme="blue"
              width="100%"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </FormProvider>
  )
}
