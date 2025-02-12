import service from '/@src/utils/request'

export async function apiGetProfile(): Promise<any> {
  const res = await service({
    url: `/profile`,
    method: 'get',
  })
  
  return res.data
}

