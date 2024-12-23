import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema'
import { FormData } from './types/FormData'
import { PriceType } from './types/PriceType'
import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Button,
  Box,
  Stack,
  VStack,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'

export const Form = () => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const saveData = (data: FormData) => {
    console.log(data)
  }

  const priceType = watch('price.type')

  return (
    <Box maxW="lg" mx="auto" p={{ base: 4, md: 8 }}>
      <form onSubmit={handleSubmit(saveData)}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              autoFocus
              data-testid="name"
              {...register('name')}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" data-testid="email" {...register('email')} />
          </FormControl>
          <FormControl>
            <FormLabel>Price Type</FormLabel>
            <RadioGroup>
              <Stack direction="row" spacing={4}>
                <Radio
                  id="fixed"
                  value={PriceType.Fixed}
                  {...register('price.type')}
                  data-testid="fixed-type"
                >
                  Fixed
                </Radio>
                <Radio
                  id="range"
                  value={PriceType.Range}
                  {...register('price.type')}
                  data-testid="range-type"
                >
                  Range
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {priceType === PriceType.Fixed && (
            <FormControl>
              <FormLabel htmlFor="fixedAmount">Amount</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  id="fixedAmount"
                  data-testid="fixed-amount"
                  type="number"
                  {...register('price.amount')}
                />
              </InputGroup>
            </FormControl>
          )}
          {priceType === PriceType.Range && (
            <Stack
              spacing={4}
              direction={{ base: 'column', md: 'row' }}
              width="100%"
            >
              <FormControl>
                <FormLabel htmlFor="min">Min</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <Input
                    id="min"
                    data-testid="min-amount"
                    type="number"
                    {...register('price.amount.min')}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="max">Max</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <Input
                    id="max"
                    data-testid="max-amount"
                    type="number"
                    {...register('price.amount.max')}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          )}
          <Button
            type="submit"
            data-testid="submit-button"
            colorScheme="blue"
            width="100%"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
