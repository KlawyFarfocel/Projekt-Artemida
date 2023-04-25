import "./styles/StatsDate.css";
function StatsDate(props){
    var month=props.date.toLocaleString('pl-PL',{month:'long'});
    var day=props.date.toLocaleString('pl-PL',{day:'numeric'});
    var year=props.date.toLocaleString('pl-PL',{year:'numeric'});
    return(
        <div className="stats-date">
            <div className="stats-date__month">{month}</div>
            <div className="stats-date__year">{year}</div>
            <div className="stats-date__day">{day}</div>
        </div>
    )
}
export default StatsDate;