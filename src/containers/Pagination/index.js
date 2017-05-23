import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  // VioletFlipper,
  VioletDataTable,
  VioletPaginator,
  // VioletPageSizeDropdown,
  configurePageParams
} from 'violet-paginator';
//从violet-paginator引入组件
import { Link } from 'react-router'
//引入Loading组件
import fetchRecipes ,{toggleActive} from '../../redux/modules/paginator/fetch';
const styles = require("./index.less");
configurePageParams({
  perPage: 'results_per_page',
  sortOrder: 'sort_reverse',
  sortReverse: true
})
//设置发送请求
@connect((state)=>({
	loading: state.connect.connected
}),{
	fetch: fetchRecipes,
  toggle: toggleActive
})
/**
 * 加入服务端渲染的步骤
 * 第一步:在reducer中配置
 * 第二步：在UI组件中使用
 * 第三步：在createStore中使用immutable
 *  if (data) {
     data.recipeGrid = Immutable.fromJS(data.recipeGrid);
     }
  第四步：在我们的UI组件前面添加配置
  configurePageParams({
	  perPage: 'results_per_page',
	  sortOrder: 'sort_reverse',
	  sortReverse: true
	})
  第五步：我们一直没有正常的分页原因已经找到，是因为我们在fetch方法中如下位置:
      dispatch({ type: actionTypes.CONNECTED });
  报错了
 */
 export default class Pagination extends React.Component{
  headers() {
 	//这个field的值必须和服务器返回的字段的值一致
    return [{
      field: 'name',
      text: "名称"
    }, {
      field: 'created_at',
      text: "创建于"
    }, {
      field: 'boil_time',
      sortable: false,
      text: "结束于"
    },{
      field: 'active',
      sortable: false,
      text: 'Active?',
      format: recipe => {
        // console.log("format======",recipe);
        //虽然recipeGrid是immutable，但是这里不是immutable的
        return (<input
          type="checkbox"
          checked={!!recipe.active}
          onChange={() => this.props.toggle(recipe)}
        />
      )}
    }
    ]
  }

	render(){
		 const { fetch,loading } = this.props;
     //这里的fetch方法不要求自己调用，会自动被调用，不需要我们干预
		 // const flipper = (
		 //      <VioletFlipper listId="recipeGrid" />
		 //    )
		 // VioletPageSizeDropdown允许选择pageSize
		return (
              <div className="pagination">
       
                <VioletDataTable listId="recipeGrid" headers={this.headers()} />
                 <VioletPaginator listId="recipeGrid"  />
              </div>
			)
	}
}

