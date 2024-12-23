import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema'
import { FormData } from './types/FormData'
import { PriceType } from './types/PriceType'

export const Form = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { register, handleSubmit, watch } = formMethods

  const saveData = (data: FormData) => {
    console.log(data)
  }

  const priceType = watch('price.type')

  return (
    <div className="Form">
      <form onSubmit={handleSubmit(saveData)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" data-testid="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" data-testid="email" {...register('email')} />
        </div>
        <fieldset>
          <legend>Price Type</legend>
          <div>
            <input
              type="radio"
              id="price-fixed"
              value={PriceType.Fixed}
              {...register('price.type')}
              data-testid="fixed-type"
            />
            <label htmlFor="price-fixed">Fixed</label>
          </div>
          <div>
            <input
              type="radio"
              id="price-range"
              value={PriceType.Range}
              {...register('price.type')}
              data-testid="range-type"
            />
            <label htmlFor="price-range">Range</label>
          </div>
        </fieldset>
        {priceType === PriceType.Fixed && (
          <div>
            <label htmlFor="fixed-amount">Amount</label>
            <input
              id="fixed-amount"
              data-testid="fixed-amount"
              type="number"
              {...register('price.amount')}
            />
          </div>
        )}
        {priceType === PriceType.Range && (
          <fieldset>
            <legend>Price Range</legend>
            <label htmlFor="min-amount">Min</label>
            <input
              id="min-amount"
              data-testid="min-amount"
              type="number"
              {...register('price.amount.min')}
            />
            <label htmlFor="max-amount">Max</label>
            <input
              id="max-amount"
              data-testid="max-amount"
              type="number"
              {...register('price.amount.max')}
            />
          </fieldset>
        )}
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}
