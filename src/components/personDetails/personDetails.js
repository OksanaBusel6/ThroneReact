import React, {Component} from 'react';
import styled from 'styled-components';
import { Term } from '../randomChar/randomChar';

const DetailsWrap = styled.div `
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem;
`;

const DetailsTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

export default class PersonDetails extends Component {

  render() {
    return (
      <DetailsWrap>
        <DetailsTitle>John Snow</DetailsTitle>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <Term>Gender</Term>
            <span>male</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Born</Term>
            <span>1783</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Died</Term>
            <span>1820</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Culture</Term>
            <span>First</span>
          </li>
        </ul>
      </DetailsWrap>
    )
  }
}