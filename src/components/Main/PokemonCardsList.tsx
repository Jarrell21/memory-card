import { Fade, Grid, Skeleton } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { useState } from "react";
import { shuffleCards } from "../../helpers/HelperFunctions";

type PokemonCardsListProps = {
  loading: boolean;
  difficulty: number;
  data: ExpectedData[] | null;
  score: number;
  setData: React.Dispatch<React.SetStateAction<ExpectedData[] | null>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setOpenResultModal: React.Dispatch<
    React.SetStateAction<OpenResultModalProps>
  >;
};

type ExpectedData = {
  name: string;
  url: string;
};

type OpenResultModalProps = {
  open: boolean;
  loading: boolean;
  playerWon: boolean;
};

function PokemonCardsList(props: PokemonCardsListProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const flipToBack = () => {
    setIsFlipped(true);

    setTimeout(() => {
      setShuffling(true);
      shuffleCards(props.data);
    }, 200);
  };

  const flipToFront = () => {
    setIsFlipped(false);

    setTimeout(() => {
      setShuffling(false);
    }, 200);
  };

  const handleFlip = () => {
    flipToBack();

    setTimeout(() => {
      flipToFront();
    }, 1000);
  };

  function handleCardClick(name: string, clicked: boolean) {
    const totalScore = props.difficulty / 3;
    if (props.score > totalScore - 1) return;

    if (clicked) return handleLoss();

    if (props.score === totalScore - 1) {
      handleWin();
    } else {
      continueGame(name);
    }

    props.setScore((prev) => prev + 1);
  }

  function handleLoss() {
    props.setOpenResultModal((prev) => ({
      ...prev,
      open: true,
      playerWon: false,
    }));
    resetClickedProp();
  }

  function handleWin() {
    props.setOpenResultModal((prev) => ({
      ...prev,
      open: true,
      playerWon: true,
    }));
  }

  function continueGame(name: string) {
    handleFlip();

    setTimeout(() => {
      const newData = props.data!.map((obj) =>
        obj.name === name ? { ...obj, clicked: true } : obj
      );

      props.setData(newData);
    }, 1000);
  }

  function resetClickedProp() {
    const newData = props.data!.map((obj) => ({
      ...obj,
      clicked: false,
    }));
    props.setData(newData);
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {props.data &&
        (props.loading
          ? Array.from(new Array(props.difficulty / 3))
          : props.data
        ).map((item, index) => (
          <Grid item key={index} xs={2.4}>
            {item ? (
              <PokemonCard
                shuffling={shuffling}
                isFlipped={isFlipped}
                handleCardClick={handleCardClick}
                cardData={item}
              />
            ) : (
              <Fade
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                {...{ timeout: 1000 }}
              >
                <Skeleton variant="rectangular" height={300} />
              </Fade>
            )}
          </Grid>
        ))}
    </Grid>
  );
}

export default PokemonCardsList;
