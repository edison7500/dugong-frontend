import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useEffect, useState} from "react";
import {useEagerConnect, useInactiveListener} from "../../lib/hooks";
import {injected} from "../wallet/connectors";

const ConnectWallet = () => {
  // const context = useWeb3React<Web3Provider>()
  const {active, account, library, connector, activate, deactivate} = useWeb3React<Web3Provider>()
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  console.log(triedEager)

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const connect = async () => {
    try {
      await activate(injected)
    } catch (e) {
      console.log(e)
    }
  }

  const disconnect = () => {
    try {
      deactivate()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
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
