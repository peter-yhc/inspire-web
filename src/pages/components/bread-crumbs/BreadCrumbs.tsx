import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useProject } from 'hooks';

interface MatchProps {
    collection: string;
    focus: string;
}

const BreadCrumbLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const H5 = styled.h5`
  margin: 0;
`;

export default function BreadCrumbs() {
  const match = useRouteMatch<MatchProps>();
  const { projectId, projectName, projectCategories } = useProject();
  const [collection, focus] = [match.params.collection, match.params.focus];

  return (
    <H5>
      <BreadCrumbLink to="/dashboard">{projectName}</BreadCrumbLink>
      {' > '}
      <BreadCrumbLink to={`/${projectId}/${collection}`}>{projectCategories[collection].name}</BreadCrumbLink>
      {focus && ' > '}
      {focus && <BreadCrumbLink to={`/${projectId}/${collection}/${focus}`}>{projectCategories[collection].focuses[focus].name}</BreadCrumbLink>}
    </H5>
  );
}
