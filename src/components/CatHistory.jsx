const CatHistory = (props) => {

    return (
        <>
            <div className="history-container">
                <h1 className="title">Who have we seen so far?</h1>
                
                {props.items.map((element, idx) => {
                    return <div key={idx} className="message-wrapper">
                        <div className="side-image-wrapper">
                        <img src={element[0]} className="side-cat-image"></img>
                        </div>
                        <h4 className="title">{element[1]} cat from {element[4]}</h4>
                    </div>
                })}
            
            </div>

        </>
    )
}
export default CatHistory