import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from "@mui/material";
import pokemonBackSide from "../../images/pokemon_card_backside.png";

type PokemonCardProps = {
  cardData: CardDataProps;
  isFlipped: boolean;
  shuffling: boolean;
  handleCardClick: (name: string, clicked: boolean) => void;
};

type CardDataProps = {
  name: string;
  url: string;
  clicked: boolean;
};

export default function PokemonCard(props: PokemonCardProps) {
  const pokemonId = sliceString(props.cardData.url, "/");
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  function sliceString(input: string, delimiter: string) {
    var parts = input.split(delimiter);
    return parts[parts.length - 2];
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 2000 }}>
      <div className={`flip-card ${props.isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          {!props.shuffling ? (
            <Card className="flip-card-front" variant="outlined">
              <CardActionArea
                onClick={() =>
                  props.handleCardClick(
                    props.cardData.name,
                    props.cardData.clicked
                  )
                }
              >
                <CardMedia
                  component="img"
                  image={pokemonImg}
                  alt={props.cardData.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign={"center"}
                  >
                    {capitalize(props.cardData.name)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            <Card className="flip-card-back">
              <CardMedia
                component="img"
                image={pokemonBackSide}
                alt={props.cardData.name}
              />
            </Card>
          )}
        </div>
      </div>
    </Fade>
  );
}
