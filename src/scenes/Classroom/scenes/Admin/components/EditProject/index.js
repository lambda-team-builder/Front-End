import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, Button, ButtonSmallSubtle, SubtleInput, SubtleTextarea } from 'styles';
import DropdownSearch from  'components/DropdownSearch';

const EditProject = ({project, classroom_id, ...props}) => {
  const [addSlotId, setAddSlotId]   = useState(null);
  const [addingRole, setAddingRole] = useState(false);
  return (
    <div>
      <StyledForm onSubmit={event => {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
        props.updateProject(classroom_id, project.id, {
          name: name,
          description: description,
        });
      }}>
        <SubtleInput type="text" name="name" placeholder="name" defaultValue={project.name}/>
        <SubtleTextarea name="description" placeholder="description" defaultValue={project.description}/>
        <Button style={{maxWidth: "300px", margin: "0 auto"}}type="submit">Submit Changes</Button>
      </StyledForm>
      <h2>Roles</h2>
      <RolesContainer>
        {project.roles.map(({name, slots, id: role_id}) => (
          <RoleDiv key={name}>
            <h3 style={{margin: "0", padding: "0"}}>
              {name + "   "}
              <ButtonSmallSubtle bg={colors.reflection}
                                 onClick={() => props.createSlot(classroom_id, project.id, {role_id})}>
                add
              </ButtonSmallSubtle>
            </h3>
            {slots.map(slot => {
              if (slot.user_name) {
                return (
                  <MemberRow key={slot.id}>
                    {slot.user_name}
                    <ButtonSmallSubtle bg={colors.love}
                                       onClick={() => (props.removeUserFromSlot(classroom_id, slot.id))}>
                      remove
                    </ButtonSmallSubtle>
                  </MemberRow>
                );
              } else {
                if (addSlotId === slot.id) {
                  return (
                    <DropdownSearch
                      key="unique"
                      placeholder="members"
                      max={4}
                      close={() => setAddSlotId(null)}
                      values={props.members.map(m => m.user_name)}
                      onClick={idx =>
                               props.addUserToSlot(classroom_id, slot.id, {
                                 classroom_member_id: props.members[idx].classroom_member_id
                               })
                               .then(() => setAddSlotId(null))}
                    />
                  );
                } else {
                  return (
                    <MemberRow key={slot.id}>
                      <ButtonSmallSubtle onClick={() => setAddSlotId(slot.id)}>
                        select
                      </ButtonSmallSubtle>
                      <ButtonSmallSubtle
                        bg={colors.love}
                        onClick={() => props.deleteSlot(classroom_id, project.id, slot.id)}>
                        delete
                      </ButtonSmallSubtle>
                    </MemberRow>
                  );
                }
              }
            })}
          </RoleDiv>
        ))}
      </RolesContainer>
      <Button style={{maxWidth: "300px", margin: "0 auto"}}
              bg={colors.eclipse}
              onClick={() => setAddingRole(true)}>
        add role
      </Button>
      {addingRole &&
       <div>
         {props.uniqueRoles.map(({name, id: role_id}) => (
           <button key={role_id}
                   onClick={() => (
                     props.createSlot(classroom_id, project.id, {role_id})
                       .then(() => setAddingRole(false)))}>
             {name}
           </button>))}
         <form onSubmit={e => {
           e.preventDefault();
           e.target.role.value.trim() !== "" &&
             props.createRole(classroom_id, project.id, {name: e.target.role.value})
             .then(() => setAddingRole(false));
         }}>
           <input type="text" name="role" placeholder="new role"/>
           <button type="submit">New Role</button>
         </form>
       </div>
      }
    </div>
  );
};

const StyledForm = styled.form`
  * {
    margin-bottom: 20px;
  }
`;

const MemberRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const RolesContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
`;

const RoleDiv = styled.div`
  max-width: 300px;
  width: 100%;
  padding-bottom: 20px;
`;

export default EditProject;
