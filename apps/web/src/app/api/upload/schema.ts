import { zfd } from 'zod-form-data'

export const uploadSchema = zfd.formData({
  date: zfd.text(),
  type: zfd.text(),
  images: zfd.repeatableOfType(zfd.file()),
})
