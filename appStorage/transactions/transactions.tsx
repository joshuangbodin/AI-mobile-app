import TransactionList from "@/components/functional/list"
import { formatCurrency } from "@/helpers/pricecustomization"
import { transaction, transactionList } from "@/types/app.t"
import AsyncStorage from "@react-native-async-storage/async-storage"

const key = 'transaction-list'

export const getListFromStorage = async () => {
    try {
        const data = await AsyncStorage.getItem(key)
        if (data) {
            const objdata = JSON.parse(data)
            return { success: true, data: objdata }
        } else {
            return { success: false, data: 'List not found' }
        }
    }
    catch (err: any) {
        return { success: false, data: err.message }
    }
}


const createList = async () => {
    try {
        const { success } = await getListFromStorage()

        if (success) {
            return { success: false, data: 'list already exists' }
        }
        else {
            try {
                const transactionList: transactionList = { list: [] }
                const data = JSON.stringify(transactionList)
                const session = await AsyncStorage.setItem(key, data)
                return { success: true, data: 'list created' }
            }
            catch (err: any) {
                return { success: false, data: err.message }
            }
        }
    }

    catch (err: any) {
        return { success: false, data: err.message }
    }
}


export const addToList = async (info: transaction) => {



    const { success, data } = await getListFromStorage()

    if (success) {

        //field manipulation
        const dateCreated = new Date()
       

        //optimizing the list
        info = { ...info, dateCreated }
        const transactionList: transactionList = data

        // insertion
        transactionList.list = [info, ...transactionList.list]
        setNewList(transactionList)
        const check = await getListFromStorage()


        
        if (check.success) {
           // console.log(check)
        }

    } else {
        const newlistsession = await createList()

        if (newlistsession.success) {
            addToList(info)
        }
        else {
            //console.log(newlistsession.data)
        }
    }

}



export const deleteFromList = async (info: transaction) => {
    const { success, data } = await getListFromStorage()

    if (success) {

        const transactionList: transactionList = data

        // deletion
       
        var filteredList = transactionList.list.filter(
            (listitem:transaction) => {
                if(listitem.dateCreated !== info.dateCreated){
                    return listitem
                }
            }
        )


        transactionList.list = filteredList
        




        await setNewList(transactionList)
        const check = await getListFromStorage()


        
        if (check.success) {
           // console.log(check)
        }

       

    } else {
        const newlistsession = await createList()

        if (newlistsession.success) {
            addToList(info)
        }
        else {
           // console.log(newlistsession.data)
        }
    }


}



export const setNewList = async (data: transactionList) => {
    const objdata = JSON.stringify(data)
    await AsyncStorage.setItem(key, objdata)
}

export const clearList = async ()=>{
    const list = await getListFromStorage()
    
    if(list.success){
        var temp:transactionList = list.data
        
        temp.list = []    

        setNewList(temp)
    }
}