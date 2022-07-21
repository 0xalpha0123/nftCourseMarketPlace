import { useHooks } from "@components/providers/web3"

const enahcneHook = swrRes => {
    return {
        ...swrRes,
        hasInitialResponse : swrRes.data || swrRes.error
    }
}

export const useAccount = () => {
    const swrRes = enahcneHook(useHooks(hooks => hooks.useAccount)())
    return swrRes
}

export const useNetwork = () => {
    const swrRes = enahcneHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network : swrRes
    }
}

export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()

    return {
        account,
        network,
        canPurchaseCourse : !!(account.data && network.isSupported)
    }
}