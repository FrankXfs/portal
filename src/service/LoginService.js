/**
 * Created by frank on 15/08/2017.
 */
import {Post} from './HttpService';
import {loginSuccessAction,loginFailedAction} from '../action/index'

export  const  GetToken = (username,password,dispatch)=>{

    let bodyData = {
        "username": username,
        "password": password,
    }


    Post("http://localhost:9098/token-service/session", bodyData,
        (result) => {
            if (result !== undefined && result !== null && result.operationStatus === "SUCCESS"){

                dispatch(loginSuccessAction(result.item.firstName,result.item.token));

            }
            else {
                dispatch(loginFailedAction());
            }

        }
        ,
        (err) =>{

            console.log(err)
            dispatch(loginFailedAction());

        },false
    )


}