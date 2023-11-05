import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";

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

function GameResultModal({ open, setOpen, restartGame }) {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    restartGame();
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <Modal
      open={open.open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose(event, reason);
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
        ) : open.playerWon ? (
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

GameResultModal.propTypes = {
  open: PropTypes.object,
  setOpen: PropTypes.func,
  restartGame: PropTypes.func,
};

export default GameResultModal;
