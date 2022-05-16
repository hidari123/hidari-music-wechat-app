import hidariRequest from './index'

export const getBanners = () => {
  return hidariRequest.get('/banner', {
    type: 2
  })
}