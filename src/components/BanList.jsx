const BanList = (props) => {
    const removeFromList = (term) => {
        props.setBanned(props.banned.filter(elem => elem != term))
    }

    return (
        <>
            <div className="ban-container">
                <h1 className="title">
                    Ban List
                </h1>
                <h2 className="title">Select an attribute in your listing to ban it</h2>
                {props.banned.map((detail, idx) => {
                    return <button className="kitty-descriptor-button"
                        key={idx} onClick={() => removeFromList(detail)}>{detail}</button>
                })}
            </div>
        </>
    )
}
export default BanList