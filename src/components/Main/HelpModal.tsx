import { Box, Modal, Typography } from "@mui/material";

type HelpModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
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

export default function HelpModal({ open, setOpen }: HelpModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            How to Play
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
            textAlign={"center"}
          >
            Score a point by clicking a Pokemon card. You will lose if you click
            on the same Pokemon card twice!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
