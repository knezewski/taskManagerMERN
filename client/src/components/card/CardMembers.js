import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCardMember } from '../../actions/board';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';


const CardMembers = ({ card }) => {
  const classes = useStyles();
  const [filteredMembers, setFilteredMembers] = useState('');
  const { user } = useSelector((state) => state.auth);
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map(({user}) => user);
  const dispatch = useDispatch();

  //check role of admin
  const boardMember = boardMembers.filter(item => {
    if(user.name === item.name ) {
      return boardMembers
    }
  });

  const getRole = boardMember.map(({value}) => {
    return value;
  });

  const currentRole = getRole[0];

  useEffect(() => {
    filteredByRole()
  }, [] )

  const filteredByRole = () => {
    let items = '';

    switch (currentRole) {
      case "project-manager":
          setFilteredMembers(boardMembers)
          break;
      case "front-end-senior" || "back-end-senior":
          items = boardMembers.filter(({group, level}) => level >=1 && group === "front" && "back" && "analyst");
          setFilteredMembers(items);
        break;
      case "front-end-middle" || "back-end-middle":
          items = boardMembers.filter(({group, level}) => level <=2 && group === "front" && "back" && "analyst");
          setFilteredMembers(items);
        break;
      case "qa-senior":
          items = boardMembers.filter(({group, level}) => level >=1 && group === "front" && "back" && "analyst");
          setFilteredMembers(items);
        break;
      case "qa-middle":
        items = boardMembers.filter(({group, level}) => level <=2 && group === "qa" && "back" && "front" && "analyst");
          setFilteredMembers(items);
        break;
      case "business-analyst-senior":
      items = boardMembers.filter(({group, level}) => level >=1 && group === "front" && "back" && "analyst");
          setFilteredMembers(items);
        break;
      case "business-analyst-middle":
      items = boardMembers.filter(({group, level}) => level <=2 && group === "front" && "back" && "analyst");
          setFilteredMembers(items);
        break;
      case "ux-ui-senior":
      items = boardMembers.filter(({group, level}) => level >=1 && group === "front" && "back" && "ux-ui" && "analyst");
          setFilteredMembers(items);
        break;
      case "ux-ui-middle":
      items = boardMembers.filter(({group, level}) => level <=2 && group === "front" && "back" && "ux-ui" && "analyst");
          setFilteredMembers(items);
        break;
      case "marketing-specialist-senior":
      items = boardMembers.filter(({group, level}) => level >=1 && group === "ux-ui" && "analyst");
          setFilteredMembers(items);
        break;
      case "marketing-specialist-middle":
      items = boardMembers.filter(({group, level}) => level <=2 && group === "ux-ui" && "analyst");
          setFilteredMembers(items);
        break;
      default:
        break;
  }}



  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component='fieldset'>
          <FormGroup>
            { filteredMembers && filteredMembers.map(({user, label, name}) => (
              <FormControlLabel
                key={user}
                control={
                  <Checkbox
                    checked={members.indexOf(user) !== -1}
                    onChange={async (e) =>
                      dispatch(
                        addCardMember({
                          add: e.target.checked,
                          cardId: card._id,
                          userId: e.target.name,
                        })
                      )
                    }
                    name={user}
                  />
                }
                label={`${name} ${label ? label : ""}`}
              />
            ))}
          </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
