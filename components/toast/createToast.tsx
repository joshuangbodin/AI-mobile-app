export const showToast = (message:string , setShow:React.Dispatch<React.SetStateAction<string>>)=>{
    setShow(message);

    setTimeout(()=>{
        setShow('')
    } , 3000)
    return

}