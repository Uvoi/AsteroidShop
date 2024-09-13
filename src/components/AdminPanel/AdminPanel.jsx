import React, { useContext, useRef, useState, useEffect } from 'react';
import './styles.css';
import { Button, Grow, ListItemIcon, MenuItem, MenuList, Popper, styled } from '@mui/material';
import { Add, Delete, MenuSharp, Poll } from '@mui/icons-material';
import { themeContext } from '../../App';
import { Link } from 'react-router-dom';
import { isUserAdmin } from '../../functions/user';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  '& svg': {
    fill: theme.palette.secondary.main,
  },
}));

const AdminPanel = ({ remove, removeTitle, add, addTitle }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const theme = useContext(themeContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdminValue = await isUserAdmin();
      setIsAdmin(isAdminValue);
    };

    checkAdmin();
  }, []);


  return (
    <>
      {isAdmin && (
        <div className="AdminPanel">
          <Button
            onClick={() => setOpen(!open)}
            style={{ border: `2px ridge ${theme.palette.primary.main}` }}
            ref={anchorRef}
          >
            <MenuSharp />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            className="AdminPanelMenu"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                  <StyledMenuItem>
                    <Link to={'/admin'}>
                      <ListItemIcon title="Админка">
                        <Poll />
                      </ListItemIcon>
                    </Link>
                  </StyledMenuItem>
                  {remove && (
                    <StyledMenuItem title={removeTitle}>
                      <ListItemIcon onClick={remove}>
                        <Delete fontSize="medium" />
                      </ListItemIcon>
                    </StyledMenuItem>
                  )}
                  {add && (
                    <StyledMenuItem title={addTitle}>
                      <Link to={add}>
                        <ListItemIcon>
                          <Add fontSize="medium" />
                        </ListItemIcon>
                      </Link>
                    </StyledMenuItem>
                  )}
                </MenuList>
              </Grow>
            )}
          </Popper>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
