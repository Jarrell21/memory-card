import PropTypes from "prop-types";
import { Box, Modal, Typography } from "@mui/material/Box";

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

function HeaderModal({ open, setOpen }) {
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
            Score a point by clicking a Pokemon card. You will lose all your
            points if you click on the same Pokemon card twice!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

HeaderModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default HeaderModal;
