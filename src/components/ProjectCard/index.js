import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, Card } from '../../styles';;

const colorsArr = [colors.love, colors.brick, colors.sun, colors.pine];

const completedColor = (empty, total) => (
  colorsArr[Math.floor(((total - empty) / total) * (colorsArr.length - 1))]
);

const ProjectCard = ({project, onClick, user_id, ...props}) => {
  const [containsUser, setContainsUser] = useState(false);
  return (
    <StyledCard onClick={onClick}>
      {containsUser && <Member>member</Member>}
      <Title bg={completedColor(...project.roles.reduce(([totalEmpty, totalSlots], {empty, slots}) => (
        [totalEmpty + empty, totalSlots + slots.length]), [0, 0]))}>
          {project.name}
      </Title>
      <div className="description">
        {project.description.substring(0, 200)}
        {project.description.length > 200 && "..."}
      </div>
      <RolesDiv>
        {project.roles.map(({name, slots, empty, id}) => {
          let slotContainsUser = false;
          if (slots.findIndex(slot => user_id>=0 && user_id === slot.user_id) >= 0) {
            !containsUser && setContainsUser(true);
            slotContainsUser = true;
          }
          return <Role key={id}
                       bg={completedColor(empty, slots.length)}
                       containsUser={slotContainsUser}>
                   {`${name} ${slots.length - empty}/${slots.length}`}
                 </Role>;
        })}
      </RolesDiv>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  position: relative;
  // align-self: flex-start;
  margin: 20px 10px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #E4E4E6;
  }
  .description {
    height: 100%;
  }
`;

const RolesDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 10px 0;
`;

const Role = styled.span.attrs(({bg, containsUser, ...props}) => ({
  ...props,
  bg: bg || "transparent",
  containsUser: (containsUser && colors.antimatter) || "transparent",
}))`
  background: ${props => props.bg};
  padding: 6px 10px;
  color: ${colors.turbulence};
  box-shadow: 0 -5px 0 ${props => props.containsUser} inset;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px 10px;
`;

const Title = styled.h3.attrs(({bg, ...props}) => ({
  ...props,
  bg: bg + "66" || "transparent",
}))`
  box-shadow: 0 -10px 0 ${props => props.bg} inset, 
              0 -1px 0 ${colors.thunderhead} inset;
  margin: 0 0 10px 0;
  padding: 0;
`;

const Member = styled.div`
  position: absolute;
  left: 10px;
  top: 5px;
  color: ${colors.thunderhead};
`;

export default ProjectCard;
