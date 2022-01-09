import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Contact } from '@typings/contact';
import { MessageEmbedType } from '@typings/messages';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

interface MessageEmbedProps {
  type: string;
  embed: any;
  isMine: boolean;
}

const useStyles = makeStyles(() => ({
  message: {
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const MessageEmbed: React.FC<MessageEmbedProps> = ({ type, embed, isMine }) => {
  const embedType: MessageEmbedType = {
    contact: <ContactEmbed embed={embed} isMine={isMine} />,
  };

  return <>{embedType[type]}</>;
};

const ContactEmbed = ({ isMine, embed }: { isMine: boolean; embed: Contact }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleAddContact = () => {
    const referal = encodeURIComponent(pathname);
    history.push(`/contacts/-1?addNumber=${embed.number}&name=${embed.display}&referal=${referal}`);
  };

  return (
    <Box className={classes.message}>
      <Box>
        <Avatar src={embed?.avatar} />
        <Typography>{embed.display}</Typography>
        <Typography>{embed.number}</Typography>
      </Box>
      {!isMine && (
        <Box>
          <Button fullWidth variant="contained" color="primary" onClick={handleAddContact}>
            {t('GENERIC.ADD')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MessageEmbed;
