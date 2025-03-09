import { queryContent } from "#imports"

export const useContentCustom = async () => {
  const data = await queryContent('main').findOne()
  return data
}
