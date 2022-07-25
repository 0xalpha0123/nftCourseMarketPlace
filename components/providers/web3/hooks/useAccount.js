
import { useEffect } from "react"
import useSWR from "swr";

const adminAddresses = {
    "0x6c75f953da30d1bc15c07e5fb6eca4c5a188f7c362c495a127e635edcf8a5d1d":true
};

export const handler = (web3, provider) => () => {
    
    const {data,mutate, ...rest} = useSWR(() => 
        web3 ? "web3/accounts":null ,
        async () => {
            const accounts = await web3.eth.getAccounts()
            const account =  accounts[0];

            if (!account) {
                throw new Error("Cannot retrieve an account. Please refresh the browser.")
            }

            return account;
        }
    );

    useEffect(() => {
        const mutator = accounts => mutate(accounts[0] ?? null)
        provider?.on("accountsChanged", mutator);

        return () => {
            provider?.removeListener("accountsChanged", mutator)
        }
    },[provider])

    return { 
        account : { 
            data,
            isAdmin : (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
            mutate, 
            ...rest 
        } }
}