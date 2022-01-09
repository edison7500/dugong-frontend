import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useEffect, useState} from "react";
import {useEagerConnect, useInactiveListener} from "../../lib/hooks";
import {injected} from "../../lib/connectors";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCubes} from "@fortawesome/free-solid-svg-icons";

const ConnectWallet = () => {
  const {active, account, library, connector, activate, deactivate} = useWeb3React<Web3Provider>()
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const connect = async () => {
    try {
      setActivatingConnector(injected)
      await activate(injected)
    } catch (e) {
      console.log(e)
    }
  }
  // let blockNumber: number | undefined = 0
  const [blockNumber, setBlockNumber] = useState<number | undefined>(0)
  Promise.resolve(library?.getBlockNumber()).then((r) => {
      setBlockNumber(r)
    }
  )

  const disconnect = () => {
    try {
      deactivate()
    } catch (err: any) {
      throw new Error(err)
    }
  }


  return (
    <>
      {!account ? "" :
        <div className="mr-4 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faCubes}/>
          <span className="ml-1">{blockNumber}</span>
        </div>
      }

      <button
        type="button"
        className="bg-neutral-800
                  py-1 px-2 text-gray-400 border-solid border-2 rounded-lg border-white hover:text-white"
        onClick={!active ? connect : disconnect}
      >
        <p className="text-sm" aria-hidden="true">{
          !account ? "Connect Wallet" : `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
        }</p>
      </button>
    </>
  )
}

export default ConnectWallet;
