import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export const ListContainer = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.innerSpacing.tiny};
`;

interface ListAccordionProps {
  $open?: boolean;
}

export const ListAccordion = styled.div<ListAccordionProps>`
  display: flex;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  row-gap: ${(props) => props.theme.innerSpacing.tiny};
  
  ${(props) => props.$open && css`
    max-height: max-content;
  `}
`;

interface LabelProps {
  $sub?: boolean;
}

const Label = styled.label<LabelProps>`
  ${(props) => props.$sub && css`
    margin-left: ${props.theme.outerSpacing.large};
  `}
`;

interface ListItemProps extends InputHTMLAttributes<HTMLInputElement>{
  $sub?: boolean;
  onSelect: () => void;
  name: string;
}

export function ListItem({
  value, $sub, onSelect, name,
}: ListItemProps) {
  return (
    <Label $sub={$sub}>
      <input type="radio" value={value} onClick={onSelect} name={name} />
      {value}
    </Label>
  );
}
