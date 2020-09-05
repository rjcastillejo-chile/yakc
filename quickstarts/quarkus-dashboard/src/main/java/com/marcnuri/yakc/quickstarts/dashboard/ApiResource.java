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
 * Created on 2020-09-04, 7:19
 */
package com.marcnuri.yakc.quickstarts.dashboard;

import com.marcnuri.yakc.quickstarts.dashboard.events.EventResource;
import com.marcnuri.yakc.quickstarts.dashboard.node.NodeResource;
import javax.inject.Inject;
import javax.ws.rs.Path;

@Path("/")
public class ApiResource {

  private final EventResource eventResource;
  private final NodeResource nodeResource;

  @Inject
  public ApiResource(EventResource eventResource,
    NodeResource nodeResource) {
    this.eventResource = eventResource;
    this.nodeResource = nodeResource;
  }

  @Path("/events")
  public EventResource getEventResource() {
    return eventResource;
  }

  @Path("/nodes")
  public NodeResource getNodeResource() {
    return nodeResource;
  }
}
