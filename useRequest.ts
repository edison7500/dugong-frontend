import useSWR from "swr"

const fetcher = (url: any) => fetch(url).then(res => res.json())
