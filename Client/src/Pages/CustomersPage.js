import CustomersTableComp from '../Components/CustomersTableComp'
import { observer } from "mobx-react-lite";



const CustomersPage = ({store}) => {
    return (
        <div className="container">
            <h2>Customers Page</h2>
            <br />
            <CustomersTableComp store={store}/>
        </div>
    )
}

export default observer(CustomersPage)