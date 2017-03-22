import { center } from "./common";
import { tips } from "../actions/tips";
import { loginBox } from "../actions/loginBox";
import { loginStates } from "../actions/loginState";
import  comment  from "../actions/comment";
export function Submit(url,Data,logout) {

    return function(dispatch){
      //  center("tips");
        dispatch(tips("tipShow","正在提交"));
        console.log(url,Data);
        fetch(url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(Data),
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(tips("tipShow",data.mes))
            dispatch(loginStates("isLogin",data.user));
            if(logout){
                dispatch(loginStates("isLogout"))
            }
            dispatch(comment(data.commentData))
            //dispatch(data.message,data.code,data.user);
            console.log("mes",data.mes)
            console.log("isLogin",data.user)
            console.log("commentData",data.commentData)
            if(data.code == 200){
              //  document.getElementById("loginForm").reset();
                var counter = setTimeout(function () {
                    console.log($('#loginModal').text())
                    $('#loginModal').modal('hide')
                    clearTimeout(counter);
                },1500);
                //dispatch(loginBox('close'))

                // var counter = setTimeout(function () {
                //     $("#tips").hide();
                //     clearTimeout(counter);
                // },500);
            }
        })
    }
}
