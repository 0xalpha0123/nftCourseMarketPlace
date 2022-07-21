
import { useEffect } from "react"
import useSWR from "swr";

const adminAddresses = {
    "0xad819010d488159643b404508be687f7f393492a068b22d6eec253a10ffd6e53":true
};

export const handler = (web3, provider) => () => {
    
    const {data,mutate, ...rest} = useSWR(() => 
        web3 ? "web3/accounts":null ,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    );

    useEffect(() => {
        provider &&
        provider.on("accountsChanged",
            accounts => mutate(accounts[0] ?? null))
    },[provider])

    return { 
        account : { 
            data,
            isAdmin : (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
            mutate, 
            ...rest 
        } }
}