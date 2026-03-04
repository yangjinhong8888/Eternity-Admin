import  { type FC, useReducer } from "react"

const reducer = (state: {count: number}, action: {type: string}) => {
  switch (action.type){
    case "add":
      return {count: state.count + 1};
    default:
      return state;
  }
}

const Test: FC = () => {
  const [state, dispatch] = useReducer(reducer, {count: 0});

  const add = ()=>{
    dispatch({type: "add"});
  }

  return (<>
    {state.count}
    <div onClick={add}>点击加一</div>
  </>)
}

export default Test;