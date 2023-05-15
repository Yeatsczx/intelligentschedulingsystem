import {createStore} from 'redux';


function reducer(preState={},action){
  const {type,data}=action;
  return data;
}
export default createStore(reducer)
