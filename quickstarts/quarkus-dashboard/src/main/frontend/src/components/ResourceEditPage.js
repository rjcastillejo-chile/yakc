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
import React, {useState} from 'react';
import {useStore} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import YAML from 'yaml';
import md from '../metadata';
import AceEditor from 'react-ace';
import DashboardPage from '../components/DashboardPage';
import Card from '../components/Card';
import Link from './Link';
import Icon from './Icon';
import Alert from './Alert';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-gruvbox'

const Editor = ({
  onChange = () => {},
  value = ''
}) => (
  <AceEditor
    className='relative w-full h-full outline-none'
    style={{'--scrollbar-color': 'rgba(235, 218, 180, 0.4)'}}
    mode='yaml'
    theme='gruvbox'
    onChange={onChange}
    value={value}
    fontSize='0.9rem'
    width='100%'
    height='100%'
    tabSize={2}
  />
);

const ResourceEditPage = ({
  cardTitle = () => 'Edit - Resource',
  save,
  resourceFromState
}) => {
  const [currentAttempt, setForceReload] = useState(1);
  const [error, setError] = useState();
  const store = useStore();
  const [resource, setResource] = useState();
  const [resourceYaml, setResourceYaml] = useState('');
  if (resource === undefined) {
    const stateResource = cloneDeep(resourceFromState(store.getState()));
    if (stateResource !== undefined) {
      setResource(stateResource);
      setResourceYaml(YAML.stringify(stateResource));
    } else {
      setTimeout(() => setForceReload(currentAttempt + 1), 100);
    }
  }
  const handleSave = async () => {
    if (!save) {
      return;
    }
    try {
      setError(null);
      const updatedResource = await save(YAML.parse(resourceYaml));
      setResourceYaml(YAML.stringify(updatedResource));
    } catch (e) {
      setError(e.message);
    }
  };
  const namespace = md.selectors.namespace(resource);
  const name = md.selectors.name(resource);
  return (
    <DashboardPage
      title={`Edit - ${resource?.kind ?? ''} - ${namespace} - ${name}`}
    >
      <div className='absolute inset-0 md:p-4 flex flex-col'>
        <Card className='flex-1 flex flex-col'>
          <Card.Title className='flex items-center'>
            <div className='flex-1'>{cardTitle(resource)}</div>
            <div>
              <Link
                size={Link.sizes.small}
                variant={Link.variants.outline}
                title='Save'
                onClick={handleSave}
              >
                <Icon stylePrefix='far' icon='fa-save' className='mr-2'/>Save
              </Link>
            </div>
          </Card.Title>
          <Card.Body
            className='relative flex-1 flex flex-col bg-black text-white font-mono text-sm'
            padding='p-0'
          >
            <div className='flex-1'>
              <Editor value={resourceYaml} onChange={value => setResourceYaml(value)} />
            </div>
            <Alert
              className='absolute left-0 right-0 z-10'
              visible={error != null} margin='m-2'
              clearError={() => setError(null)}>
              {error}
            </Alert>
          </Card.Body>
        </Card>
      </div>
    </DashboardPage>
  );
};

export default ResourceEditPage;