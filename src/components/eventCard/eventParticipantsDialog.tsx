import { Avatar, Dialog, DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { EventParticipantDTO } from "../../domain/createEvent";
import { AddIcCallOutlined, PersonPinCircleOutlined } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export interface SimpleDialogProps {
  open: boolean;
  participants: EventParticipantDTO[];
  onClose: (value: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, participants, open } = props;

  const handleClose = () => {
    onClose(participants.length > 0 ? participants[0].name : '');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>Participantes</DialogTitle>
      <Divider style={{ width: '65vw' }}></Divider>
      <List sx={{ pt: 0 }}>
        {participants.map((participant) => (
          <ListItem disablePadding key={participant.id}>
            <ListItemButton onClick={() => handleListItemClick(participant.name)}>
              <Avatar alt="" src={participant.image} sx={{ mr: 2, border: '1px solid black' }} />
              <ListItemText
                primary={participant.name}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1.3rem',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}