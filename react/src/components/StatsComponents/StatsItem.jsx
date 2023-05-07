import StatsDate from "./StatsDate";
import "./styles/StatsItem.css";

function StatsItem(props) {

    return (
        <div className="stats-item">
            <StatsDate mode={props.mode=="hour"?"hour":""} date={props.date}/>
            <div className="stats-item__description">
                <h2>{props.title}</h2>
            </div>
        </div>
    );
}
export default StatsItem;