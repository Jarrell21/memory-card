import { Box, Button, Fade, Grid, Typography } from "@mui/material";

type LandingPageProps = {
  setDifficulty: (arg: number) => void;
  setGameStart: (arg: boolean) => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LandingPage({
  setDifficulty,
  setGameStart,
}: LandingPageProps) {
  function handleDifficulty(number: number) {
    setDifficulty(number);
    setGameStart(true);
  }
  return (
    <Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 2000 }}>
      <Box sx={style}>
        <Typography variant={"h4"} textAlign={"center"}>
          Select difficulty
        </Typography>
        <Grid container gap={2} justifyContent={"center"} padding={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleDifficulty(15)}
          >
            Easy
          </Button>
          <Button variant="contained" onClick={() => handleDifficulty(30)}>
            Normal
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDifficulty(60)}
          >
            Hard
          </Button>
        </Grid>
      </Box>
    </Fade>
  );
}
