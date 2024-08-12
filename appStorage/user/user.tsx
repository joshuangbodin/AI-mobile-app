import { user } from '@/types/app.t';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeUserData = async (info:user)=>{
    const {name , password , appLock} = info

    if(!name || !password ){
        return {success:false , data: 'Please fill out all the fields'}
    }

    const userData = JSON.stringify(info)

    try{
       const session =  await AsyncStorage.setItem('user' , userData)
       //console.log(session)
       return {success:true , data: 'User Saved'}
    }
    catch(err){
        return {success:false , data: 'We encounted an error while saving your data'}
    }
    
  
}

export const retrieveUserData = async ()=>{
    try{
        const response = await AsyncStorage.getItem('user')
        
        if(response){
            const data = await JSON.parse(response)
            return {success:true , data:data}
        }
        else{
            return {success:false , data:'User data not found'}
        }
    }
    catch(err:any){
        return {success:false , data: err.message}
    }
}

