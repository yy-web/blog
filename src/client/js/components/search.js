import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Pagination} from 'react-bootstrap';

import Acticle from "./acticle.js"

import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';
import * as pageActions from '../actions/page';


class Search extends React.Component {
    constructor() {
        super();

    }
    handleSelect(num){
        this.props.pageAction.pagination(num);
        const url = window.location.href;
        const ctx = url.split('?ctx=')[1];
        const _this = this;
        fetch('/search',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"num":num,'searchData':ctx})
        }).then(function(res){
            return res.json();
        }).then(function(result){
            _this.props.listDataActions(result.data)
        })
    }
    componentDidMount() {

    }

    render() {
      console.log('search-render')
      const { listData } =this.props;
        let lists = [];
        let flag  = 'block';
        listData.data.map(function(item,index){
            lists.push(<Acticle item = {item} key={index} />)
        })
        if(listData.data.length == 0){
            lists = [];
            lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>没有搜索到相关内容...</div>)
            flag  = 'none';
        }
        return (
            <div>
                <div className="container" style={{minHeight:650 + 'px'}}>
                    <Row>
                        {lists}
                    </Row>
                    <Row>
                        <div style={{textAlign:'center',display:flag}}>
                            <Pagination
                                bsSize="large"
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.props.pageNum.total}
                                maxButtons={5}
                                activePage={this.props.pageNum.num}
                                onSelect={this.handleSelect.bind(this)} />
                        </div>
                    </Row>
                </div>
            </div>


        )
    }

}
// 声明 connect 连接
// 将 redux 中的 state传给 App
const mapStateToProps = (state) => {
    return{
        tips:state.tips,
        listData:state.listData,
        pageNum:state.pageNum
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        listDataActions : bindActionCreators(listData,dispatch),
        pageAction : bindActionCreators(pageActions,dispatch),
    }
}

//声明 connect 连接
Search = connect(mapStateToProps,mapDispatchToProps)(Search);


export default Search;
