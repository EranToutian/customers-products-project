const PurchasesTableComp = (props) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr><td>Customer</td><td>Product</td><td>Date</td></tr>
                </thead>
                {props.purchases?.map((purchase, index) => { return (
                    <tbody key={index}>
                        <tr>
                            <td>{purchase?.customer_name}</td>
                            <td>{purchase?.name}</td>
                            <td>{purchase?.date.slice(0,10)}</td>
                        </tr>
                    </tbody>
                )})}
            </table>
        </div>
    )
}

export default PurchasesTableComp
