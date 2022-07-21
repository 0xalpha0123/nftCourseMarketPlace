import { useHooks } from "@components/providers/web3"

const enahcneHook = swrRes => {
    return {
        ...swrRes,
        hasInitialResponse : swrRes.data || swrRes.error
    }
}

export const useAccount = () => {
    const swrRes = enahcneHook(useHooks(hooks => hooks.useAccount)())
    return {
        account : swrRes
    }
}

export const useNetwork = () => {
    const swrRes = enahcneHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network : swrRes
    }
}