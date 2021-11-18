
const SelectListComp = (props) => {
    
    const changeSelctedElement = (e) =>{
        props.callback(e.target.value)
    }
    return (
        <div>
            <select onChange={(e) => changeSelctedElement(e)}>
                
                {props.list.map((element, index) => {
                    const id = element.id? element.id : element.customer_id
                    const name = element.name ? element.name: `${element.first_name} ${element.last_name}`
                    return(<option key={index} value={id}>{name}</option>)})}
            </select>
            <br />
        </div>
    )
}

export default SelectListComp
