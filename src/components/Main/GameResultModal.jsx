import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
    <div>
      <Modal
        open={open.open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose(event, reason);
          }
        }}
        // disableBackdropClick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            textAlign="center"
          >
            {open.playerWon ? "You win!" : "You lose!"}
          </Typography>
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
    </div>
  );
}

GameResultModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  restartGame: PropTypes.func,
};

export default GameResultModal;
