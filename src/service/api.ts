
export const fetchUtil = (url: string, body: any) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then((res) => {
      resolve(res.json())
    })
    .catch(err => {
      reject(err)
    })
  })
}