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
import reducer from './reducer';
import selectors from './selectors';
import List from './List';
import NodesCard from './NodesCard';
import NodesDetailPage from './NodesDetailPage';
import NodesPage from './NodesPage';

const nodes = {};

nodes.reducer = reducer;
nodes.selectors = selectors;
nodes.List = List;
nodes.NodesCard = NodesCard;
nodes.NodesDetailPage = NodesDetailPage;
nodes.NodesPage = NodesPage;

export default nodes;
