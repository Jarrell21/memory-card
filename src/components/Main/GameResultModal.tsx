import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";

type GameResultModalProps = {
  openResultModal: OpenResultModalProps;
  setOpenResultModal: (arg: OpenResultModalProps) => void;
  restartGame: () => void;
};

type OpenResultModalProps = {
  open: boolean;
  loading: boolean;
  playerWon: boolean;
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

export default function GameResultModal({
  openResultModal,
  setOpenResultModal,
  restartGame,
}: GameResultModalProps) {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    restartGame();
    setLoading(true);

    setTimeout(() => {
      setOpenResultModal({
        open: false,
        loading: loading,
        playerWon: false,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Modal
      open={openResultModal.open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading ? (
          <>
            <Typography textAlign="center" id="modal-modal-title" variant="h4">
              Loading game...
            </Typography>
            <ImageListItem sx={{ padding: 1 }}>
              <img
                src="https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif"
                alt="Sad_pikachu"
              />
            </ImageListItem>
          </>
        ) : openResultModal.playerWon ? (
          <>
            <Typography textAlign="center" id="modal-modal-title" variant="h4">
              You Win!
            </Typography>
            <ImageListItem sx={{ padding: 1 }}>
              <img
                src="https://media.giphy.com/media/13G7hmmFr9yuxG/giphy.gif"
                alt="Sad_pikachu"
              />
            </ImageListItem>
          </>
        ) : (
          <>
            <Typography textAlign="center" id="modal-modal-title" variant="h4">
              You Lose!
            </Typography>
            <ImageListItem sx={{ padding: 1 }}>
              <img
                src="https://media.giphy.com/media/uWPGqy4rkgllS/giphy.gif"
                alt="Sad_pikachu"
              />
            </ImageListItem>
          </>
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
          <Box textAlign="center">
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" onClick={handleClose}>
                Play again
              </Button>
            )}
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
}
