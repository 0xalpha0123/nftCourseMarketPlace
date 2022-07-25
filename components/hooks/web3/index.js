import { useHooks, useWeb3 } from "@components/providers/web3"
import { useRouter } from "next/router";
import { useEffect } from "react";

const _isEmpty = data => {
    return (
        data == null || data =="" || 
        (Array.isArray(data) && data.length === 0 ) || 
        (data.constructor === Object && Object.keys(data).length === 0)
    )
}

const enhancedHook = swrRes => {
    const { data, error } = swrRes;
    const hasInitialResponse = !!(data || error );
    const isEmpty = hasInitialResponse && _isEmpty(data);

    return {
        ...swrRes,
        isEmpty,
        hasInitialResponse
    }
}

export const useAccount = () => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useAccount)())
    return swrRes
}

export const useAdmin = ({ redirectTo }) => {
    const { account } = useAccount();
    const { requireInstall } = useWeb3()
    const router = useRouter()

    useEffect(() => {
        if (( 
            requireInstall || 
            (account.hasInitialResponse || !account.hasInitialResponse)  && !account.isAdmin) || 
            account.isEmpty
            ) {
            router.push(redirectTo)
        }
    },[account])

    return { account }
}

export const useOwnedCourses = (...args) => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useOwnedCourses)(...args))

    return {
        ownedCourses : swrRes
    }
}

export const useOwnedCourse = (...args) => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useOwnedCourse)(...args))

    return {
        ownedCourse : swrRes
    }
}

export const useManagedCourses = (...args) => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useManagedCourses)(...args))

    return {
        managedCourses : swrRes
    }
}

export const useNetwork = () => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useNetwork)())
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