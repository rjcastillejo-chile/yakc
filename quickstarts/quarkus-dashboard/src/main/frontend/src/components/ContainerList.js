/*
 * Copyright 2020 Marc Nuri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {Card, Table} from 'tabler-react';

const containerHeaders = ['Name', 'Image', 'Ports'];

const ContainerList = ({containers}) => (
  <Card title='Containers'>
    <Table
      responsive
      className='card-table table-vcenter table-striped'
    >
      <Table.Header>
        <Table.Row>
          {containerHeaders.map((header, idx) => (
            <Table.ColHeader key={idx}>{header}</Table.ColHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {containers.map(c => (
          <Table.Row key={c.name}>
            <Table.Col>{c.name}</Table.Col>
            <Table.Col>{c.image}</Table.Col>
            <Table.Col>
              {(c.ports ?? []).map((p, idx) => (
                <div key={idx}>{p.name} {p.containerPort} {p.protocol}</div>
              ))}
            </Table.Col>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Card>
);

export default ContainerList;