import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css"

const InfoBox = ({ title, cases, active, isRed, total, ...props }) => {
  console.log(props);
  return (
    //Onclick set casesType to info box clicked(cases, recovered, or deaths).
    //Set CSS using boolean values.
    <Card onClick={ props.onClick } className={ `infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}` }>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h3 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{`${cases} Today`} </h3>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
