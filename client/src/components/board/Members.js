import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addMember, deleteMember } from '../../actions/board';
import getInitials from '../../utils/getInitials';
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import options from "../../options"


const Members = () => {
  const { user } = useSelector((state) => state.auth);
  const [inviting, setInviting] = useState(false);
  const [member, setMember] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const boardMembers = useSelector((state) => state.board.board.members);
  const dispatch = useDispatch();

  const isAmountOfBoardMembersLessFifteen = boardMembers.length < 15 ? true : false;

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== '') {
      const { data } = (await axios.get(`/api/emails`));
      const filtered = data.filter(({email}) => {
        return email !== user.email
     })
      setUsers(filtered);
    }
  };
  // eslint-disable-next-line array-callback-return
  const boardMember = boardMembers.filter((item) => {
    if(user.name === item.name ) {
      return boardMembers;
    }
  });

  const cancelAddMember = () => {
      setInviting(false)
      setRole('')
  }

  const onSubmit = async () => {
    dispatch(addMember(member._id, role ));
    setMember(null);
    setInputValue('');
    setInviting(false);
  };


  const onDeleteMember = async () => {
    dispatch(deleteMember(userId));
  };

  const status = boardMember.map(({isAdmin}) => {
    return isAdmin
  })

  const [isAdmin] = status;

  return (
    <div className='board-members-wrapper'>
      <div className='board-members'>
        {boardMembers.map(({name, user}) => {
          return (
            <Tooltip title={`Delete ${name}`} key={user}>
              <Avatar className='avatar' onMouseOver={() => setUserId(user)} onDoubleClick={onDeleteMember}>{getInitials(name)}
              </Avatar>
            </Tooltip>
          );
        })}
      </div>{
       isAmountOfBoardMembersLessFifteen && isAdmin &&  (
          !inviting ? (
            <Button className='invite' variant='contained' onClick={() => setInviting(true)}>
              Invite
            </Button>
          ) : (
            <div className='invite'>
                <Select
                  value={role}
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                {
                  options?.map((el) => (
                      <MenuItem key={el.id} value={el}>{el.label}</MenuItem>
                  ))
                }
                </Select>
                <FormHelperText>Role</FormHelperText>
              <Autocomplete
                value={member}
                onChange={(e, newMember) => setMember(newMember)}
                inputValue={inputValue}
                onInputChange={(e, newInputValue) => handleInputValue(newInputValue)}
                options={users}
                getOptionLabel={(member) => member.email}
                className='search-member'
                renderInput={(params) => (
                  <TextField {...params} helperText='Search for user by email' autoFocus />
                )}
              />
              <div className='add-member'>
                <Button
                  disabled={!role}
                  variant='contained'
                  color='primary'
                  onClick={onSubmit}
                >
                  Add Member
                </Button>
                <Button onClick={cancelAddMember}>
                  <CloseIcon />
                </Button>
              </div>
            </div>
          )
        )
      }
    </div>
  );
};

export default Members;
