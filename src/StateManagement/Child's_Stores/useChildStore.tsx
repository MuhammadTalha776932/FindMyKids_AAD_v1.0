import { observable, action, makeObservable } from 'mobx';
import { createContext } from 'react';
import { AsyncTrunk } from "mobx-sync"
import AsyncStorage from '@react-native-async-storage/async-storage';

class ChildStore {
    childs: any = {};

    ispaired: boolean = false;

    storeEnterCode: string = ""

    constructor() {
        makeObservable(this, {
            childs: observable,
            ispaired: observable,
            storeEnterCode: observable,
            updateChild: action,
            setIsPaired: action,
            setPairingCode: action
        })
    }
    updateChild(newUser: any) {
        this.childs = {...this.childs, newUser};
    }

    setPairingCode: (pairingCode: string) => void = (pairingCode: string): void => {
        this.storeEnterCode = pairingCode;
    }

    setIsPaired: (pairState: boolean) => void = (pairState: boolean): void => {
        this.ispaired = pairState;
    }
}

const ChildStores = new ChildStore();
export const ChildsContext = createContext(ChildStores);

export const ChildsTrunk = new AsyncTrunk(ChildStore,{
    storage: AsyncStorage
})

export const ChildsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChildsContext.Provider value={ChildStores}>
            {
                children
            }
        </ChildsContext.Provider>
    )
}

export default ChildStores;