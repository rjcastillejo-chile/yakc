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
 * Created on 2020-09-06, 8:37
 */
package com.marcnuri.yakc.quickstarts.dashboard.pod;

import com.marcnuri.yakc.api.WatchEvent;
import com.marcnuri.yakc.model.io.k8s.api.core.v1.Pod;
import io.quarkus.runtime.annotations.RegisterForReflection;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.converters.multi.MultiRxConverters;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.jboss.resteasy.annotations.SseElementType;

import java.io.IOException;

@Singleton
@RegisterForReflection // Quarkus doesn't generate constructors for JAX-RS Subresources
public class PodResource {

  private final PodService podService;

  @Inject
  public PodResource(PodService podService) {
    this.podService = podService;
  }

  @GET
  @Produces(MediaType.SERVER_SENT_EVENTS)
  @SseElementType(MediaType.APPLICATION_JSON)
  public Multi<WatchEvent<Pod>> watch() throws IOException {
    return Multi.createFrom().converter(MultiRxConverters.fromObservable(),
      podService.watch());
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/{namespace}/{name}")
  public Pod get(@PathParam("namespace") String namespace, @PathParam("name") String name)
    throws IOException {
    return podService.getPod(name, namespace);
  }

  @DELETE
  @Path("/{namespace}/{name}")
  public Response delete(@PathParam("namespace") String namespace, @PathParam("name") String name)
    throws IOException {

    podService.deletePod(name, namespace);
    return Response.noContent().build();
  }

  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/{namespace}/{name}")
  public Pod update(@PathParam("namespace") String namespace, @PathParam("name") String name, Pod pod)
    throws IOException {

    return podService.updatePod(name, namespace, pod);
  }

  @GET
  @Produces(MediaType.SERVER_SENT_EVENTS)
  @SseElementType(MediaType.APPLICATION_JSON)
  @Path("/{namespace}/{name}/logs")
  public Multi<String> getLogs(
    @PathParam("namespace") String namespace, @PathParam("name") String name) {

    return Multi.createFrom().converter(MultiRxConverters.fromObservable(),
      podService.getPodLog(name, namespace));
  }
}
