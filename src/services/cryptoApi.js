import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'process.env.APP_API_KEY',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
        }),
        getCryptoExchanges: builder.query({
            query:() => createRequest(`/reference-currencies`)
        }),
        getCryptoCoins: builder.query({
            query:() => createRequest(`/coins`)
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery,
    useGetCryptoCoinsQuery,
} = cryptoApi;