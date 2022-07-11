const useHttp = () => {

  const request = async (url, method = 'GET', body = null, headers = {'Content-Type':'application/json', 'x-api-key':'48590d6e-8781-4957-a99d-4ce5410ff12c'}) => {

    try {
      const response = await fetch(url, {method, body, headers})

      if (!response.ok) {
        throw new Error(`Couldn't fetch ${url}, status ${response.status}`)
      }

      const data = await response.json()
      return data

    } catch(e) {
      throw e
    }
    
  }

  return {request}
}

export default useHttp