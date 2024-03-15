import * as yup from 'yup';

import { ValidationMessages } from '@shared/validations/validation_messages';

export interface Form {
  name: string;
}

export const schema = yup.object<Form>({
  name: yup.string().min(1, ValidationMessages.required).required(ValidationMessages.required),
});
