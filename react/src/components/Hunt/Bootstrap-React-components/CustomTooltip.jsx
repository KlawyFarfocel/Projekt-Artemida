
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
export default function CustomTooltip(props){
    return(
        <OverlayTrigger
            key={props.placement}
            placement={props.placement}
            overlay={
                <Tooltip>
                    {props.tooltipBody}
                </Tooltip>
            }
            >
            <div>
                <button className={props.buttonClassNameString} style={{pointerEvents:"none"}} disabled={(props.isDisabled?true:"")}>{props.buttonText}</button>
            </div>
        </OverlayTrigger>
    )
}

