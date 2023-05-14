import "./styles/StatsDate.css";
function StatsDate(props){
    var month=props.date.toLocaleString('pl-PL',{month:'long'});
    var day=props.date.toLocaleString('pl-PL',{day:'numeric'});
    var year=props.date.toLocaleString('pl-PL',{year:'numeric'});
    var hour;
    
    (props.mode=="hour"
        ?
        hour=(props.date.getHours()<10?'0':'')+props.date.getHours()+":"+(props.date.getMinutes()<10?'0':'') + props.date.getMinutes()
        :
            ""
    )
    return(
        
        <div className="stats-date">
            {
                (props.mode=="hour"?
                    <>
                        <div className="stats-date__month">{day+" "+month}</div>
                        <div className="stats-date__day">{hour}</div>
                    </>
                :
                    <>
                        <div className="stats-date__year">{year}</div>
                        <div className="stats-date__month">{month}</div>
                        <div className="stats-date__day">{day}</div>
                    </>
                )
            }

        </div>
    )
}
export default StatsDate;