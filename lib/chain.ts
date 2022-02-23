import { AddEthereumChainParameter } from '../interface/blockchain'

export const moonbeam: AddEthereumChainParameter = {
  chainId: '0x504',
  chainName: 'Moonbeam',
  rpcUrls: ['https://rpc.api.moonbeam.network'],
  nativeCurrency: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 18,
  },
  blockExplorerUrls: ['https://moonscan.io/'],
  iconUrls: ['https://assets.coingecko.com/coins/images/22459/large/glmr.png'],
}
