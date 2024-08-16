import { user } from '@/types/app.t';
//import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'



export const storeUserData = async (info:user)=>{
    const {name , password , appLock , dateCreated} = info

    if(!name || !password ){
        return {success:false , data: 'Please fill out all the fields'}
    }

    const userData = JSON.stringify(info)
    info.dateCreated = String(new Date())

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
            return {success:true , data:{...data , password:null}}
        }
        else{
            return {success:false , data:'User data not found'}
        }
    }
    catch(err:any){
        return {success:false , data: err.message}
    }
}

export const authenticateUser =  async ({name , password}:user) =>{
    try{
        const authUser = await retrieveUserData()

        if(authUser.success){
            if(authUser.data.name == name && authUser.data.password == password){
                return {success:true , data:'User Verified'}
            }
            else{
                return {success:false , data: 'User credentials do not match'}
            }
        }
        else{
            return {success:false , data: 'User not found'}
        }
    }
    catch(err:any){
        return {success:false , data:err.message}
    }
}


export const deleteUserInfo = async ()=>{
    await AsyncStorage.clear()
}

