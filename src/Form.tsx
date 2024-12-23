import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchema } from './schema'

export const Form = () => {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
  })

  // The callback to use when the form is submitted
  const saveData = (data) => {
    console.log(data)
  }

  return <div className="Form">Your exercise code goes here</div>
}
