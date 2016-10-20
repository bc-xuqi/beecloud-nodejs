import React from 'react';
import * as config from '../const/config';
import {postman} from '../actions/request.js';
import PureComponent from '../components/PureComponent';

export default class Auth extends PureComponent {
    checkoff(){
        let data = {},_this = this;
        data.timestamp = new Date().valueOf();//时间戳，毫秒数	
        data.app_id = config.APP_ID;//App在BeeCloud平台的唯一标识	
        data.app_secret = config.APP_SECRET;
        data.phone = '18625002907';
        postman({
            type:'post',
            url:config.interfaceUrls.checkoff,
            data:data,
            success:function(res){

            }
        })
    }
    

    componentDidMount(){
        this.checkoff();
    }

    render(){
        return (
            <div></div>
        )
    }
}


