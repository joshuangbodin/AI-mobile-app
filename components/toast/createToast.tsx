export const showToast = (message:string , setShow:React.Dispatch<React.SetStateAction<string>>)=>{
    setShow(message);

    setInterval(()=>{
        setShow('')
    } , 5000)
    return

}