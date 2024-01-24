import Loader from "react-js-loader";

const MyLoader = ({color}) => {
    return (
        <div className={"item"}>
        <Loader type="spinner-circle" bgColor={color} color={color} title={"spinner-circle"} size={100} />
    </div>
    )
}

export default MyLoader
