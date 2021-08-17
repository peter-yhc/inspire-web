import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import { useProject } from 'hooks';
import Button from '../../../button/Button';
import ProjectSelector from './components/ProjectSelector';

const Nav = styled.nav`
  height: 100%;
  border-right: 1px ${(props) => props.theme.colours.grey} solid;
  padding: ${(props) => props.theme.innerSpacing.large};
  background-color: ${(props) => props.theme.colours.lightGrey};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -${(props) => props.theme.innerSpacing.large};
  height: 60px;
`;

const LogoImage = styled.img`
  margin-right: ${(props) => props.theme.outerSpacing.small};
  width: 35px;
  height: 35px;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryLink = styled(Link)`
  color: ${(props) => props.theme.colours.black};
  text-decoration: none;
  padding: ${(props) => `calc(${props.theme.outerSpacing.tiny} / 2)`};
  
  &:hover {
    background-color: hsl(200,27%,91%)
  }
`;

const SubCategories = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.outerSpacing.small};
`;

const SubCategoryLink = styled(CategoryLink)`
  padding-left: ${(props) => props.theme.outerSpacing.medium};
  color: ${(props) => props.theme.colours.darkGrey};
`;

const ProjectLabel = styled.label`
  display: block;
  margin-top: ${(props) => props.theme.outerSpacing.medium};
`;

const ActiveProjectSelector = styled(ProjectSelector)`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.outerSpacing.medium};
`;

const NewCategoryButton = styled(Button)`
  margin-top: ${(props) => props.theme.outerSpacing.medium}
`;

export default function SideNav({ className }: HTMLAttributes<HTMLDivElement>) {
  const { projectId, projectCategories } = useProject();

  const renderCategories = () => Object.entries(projectCategories).map(([id, category]) => (
    <React.Fragment key={id}>
      <CategoryLink role="listitem" to={`/${projectId}/${id}`}>{category.name}</CategoryLink>
      {Object.keys(category.subCategories).length > 0
        && (
        <SubCategories>
          {Object.entries(category.subCategories).map(([subId, subCategory]) => (
            <SubCategoryLink role="listitem" to={`/${projectId}/${id}/${subId}`} key={subId}>
              {subCategory.name}
            </SubCategoryLink>
          ))}
        </SubCategories>
        )}
    </React.Fragment>
  ));

  return (
    <Nav className={className}>
      <LogoContainer>
        <LogoImage src={Logo} alt="" />
        <h3>Design Tree</h3>
      </LogoContainer>
      <ProjectLabel>
        <h6>Current Project:</h6>
        <ActiveProjectSelector />
      </ProjectLabel>
      <Categories role="list">
        {renderCategories()}
      </Categories>
      <NewCategoryButton inline>
        + New Category
      </NewCategoryButton>
    </Nav>
  );
}