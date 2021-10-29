import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Fade from "react-reveal/Fade";

const Detail = () => {
  //Hardcoded car data
    const carData = [
        {
            "id": 0,
            "title": "Model S",
            "description": "Order Online for Touchless Delivery",
            "image": "model-s.jpg",
            "range": "390",
            "time": "1.99",
            "topSpeed": "200",
            "peakPower": "1,020"
        },
        {
            "id": 1,
            "title": "Model 3",
            "description": "Order Online for Touchless Delivery",
            "image": "model-3.jpg",
            "range": "400",
            "time": "2.99",
            "topSpeed": "180",
            "peakPower": "900"
        },
        {
            "id": 2,
            "title": "Model X",
            "description": "Order Online for Touchless Delivery",
            "image": "model-x.jpg",
            "range": "350",
            "time": "1.55",
            "topSpeed": "150",
            "peakPower": "1,130"
        },
        {
            "id": 3,
            "title": "Model Y",
            "description": "Order Online for Touchless Delivery",
            "image": "model-y.jpg",
            "range": "410",
            "time": "2.05",
            "topSpeed": "190",
            "peakPower": "1,040"
        }
    ]

    //Pull id using route params
    const { id } = useParams();
    console.log(id);

    //Set attributes dynamically depening on id param
    return (
        <Wrap bgImage={carData[id].image}>
        <Fade botttom>
          <ItemText>
            <h1>{carData[id].title}</h1>
            <p>{carData[id].description}</p>
          </ItemText>
        </Fade>
        <Buttons>
          <Fade top>
            <SpecGroup>
              <CarSpecs>
                  { carData[id].range } mi
                  <br />
                  <Key>Range (est.)</Key>
                  </CarSpecs>
              <CarSpecs>
                  { carData[id].time } s
                  <Key>0-60 mph*</Key>
                  </CarSpecs>
              <CarSpecs>
                  { carData[id].topSpeed } mph
                  <br />
                  <Key>Top Speed</Key>
                  </CarSpecs>
              <CarSpecs>
                  { carData[id].peakPower } hp
                  <br />
                  <Key>Peak Power</Key>
                  </CarSpecs>
                  <RightButton>Order Now</RightButton>
            </SpecGroup>
            </Fade>
          
        </Buttons>
      </Wrap>
    )
}

export default Detail

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: ${(props) => `url("/images/${props.bgImage}")`};
`;

const ItemText = styled.div`
  padding-top: 15vh;
  text-align: center;
`;

const SpecGroup = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CarSpecs = styled.div`
height: 40px;
width: 200px;
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 100px;
opacity: 0.50;
text-transform: uppercase;
font-size: 26px;
font-weight: bold;
margin: 12px;
`

const Key = styled.div`
  color: white;
  font-size: 14px;
`


const RightButton = styled.div`
  border: solid white 2px;
  opacity: 0.50;
  color: white;
  font-weight: bold;
  height: 40px;
  width: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  margin: 12px;

  &:hover {
      opacity: 0.80;
      transition: all 0.25s ease-in;
      background: white;
      color: black;
  }
`;


const Buttons = styled.div`
`;
