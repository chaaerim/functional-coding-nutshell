/**
 * 출제자: 예진님 (yejineee)
 * URL의 쿼리스트링 관련 유틸 함수를 계산 을 최대한 이용하여 만들기
 *
 * - 해쉬가 있다면, 유지해야 함
 * - 기존 쿼리가 있다면, 유지해야 함
 * - 기존 쿼리와 추가하려는 쿼리의 key가 동일하다면, 기존 쿼리가 대체됨
 */

const splitURL = (originURL: string) => {
  const splitedURL = originURL.split('?')
  const baseURL = splitedURL[0] ?? ''
  const queries = splitedURL.length >= 2 ? splitedURL[1].split('&') : ['']
  const hashes = originURL.split('#')[1] ?? ''

  return { baseURL, queries, hashes }
}

const combineQuery = (
  queries: string[],
  key: string,
  value: string | number,
) => {
  let totalQuery = []

  if (queries[0] === '') {
    totalQuery.push(`${key}=${value}`)
    return totalQuery
  }

  let hasKeyFlag = false
  queries.forEach((query) => {
    const [queryKey, queryValue] = query.split('=')
    if (queryKey === key) {
      hasKeyFlag = true
      totalQuery.push(`${queryKey}=${value}`)
    } else {
      totalQuery.push(`${queryKey}=${queryValue}`)
    }
  })

  if (hasKeyFlag === false) {
    totalQuery.push(`${key}=${value}`)
  }

  return totalQuery
}

const makeResultULR = (
  baseURL: string,
  totalQuery: string[],
  hashes: string,
) => {
  const queryConnector = totalQuery.length >= 1 ? '?' : ''
  const hashConnector = hashes.length >= 1 ? '#' : ''
  const resultURL =
    baseURL + queryConnector + totalQuery.join('&') + hashConnector + hashes

  return resultURL
}

export const addQuery = (
  originURL: string = 'https://api.tokstudy.com/api/v1/quizzes?categoryIds=201000&size=15',
  key: string,
  value: string | number,
) => {
  const { baseURL, queries, hashes } = splitURL(originURL)

  const totalQuery = combineQuery(queries, key, value)

  const resultURL = makeResultULR(baseURL, totalQuery, hashes)
  return resultURL
}
