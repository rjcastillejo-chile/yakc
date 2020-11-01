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
import DashboardPage from './DashboardPage';
import metadata from '../metadata';
import Card from './Card';
import Link from './Link';

const ResourceDetailPage = ({
  name,
  path,
  resource,
  actions,
  body,
  editable = true,
  children
}) => {
  const namespace = metadata.selectors.namespace(resource);
  return (
    <DashboardPage
      title={
        <div className='flex items-center'>
          <Link.ResourceLink to={`/${path}`}>{name}</Link.ResourceLink>
          {namespace && <>&nbsp;- {namespace}</>}
          &nbsp;- {metadata.selectors.name(resource)}
        </div>
      }
    >
      <Card>
        <Card.Title className='flex items-center'>
          <div className='flex-1'>
            {namespace && <>{namespace} - </>}
            {metadata.selectors.name(resource)}
          </div>
          {editable && <Link.EditLink path={path} resource={resource} />}
          {actions}
        </Card.Title>
        <Card.Body>
          {body}
        </Card.Body>
      </Card>
      {children}
    </DashboardPage>
  );
};

export default ResourceDetailPage;
