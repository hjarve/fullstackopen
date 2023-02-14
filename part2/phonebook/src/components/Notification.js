//Show notification message

const Notification = ({message, successful}) => {
    if (message === null) {
        return null
    };
    const successfulStyle = {
        color: 'green',
        fontSize: 20,
        background: 'lightgrey',
        borderSize: 'green',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const errorStyle = {
        color: 'red',
        fontSize: 20,
        background: 'lightgrey',
        borderSize: 'red',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const chosenStyle = successful ? successfulStyle : errorStyle;
    return (
        <div style={chosenStyle}>
            {message}
        </div>
    )
};

export default Notification;