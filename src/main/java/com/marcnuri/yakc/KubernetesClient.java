/*
 * Yakc.java
 *
 * Created on 2020-04-11, 12:45
 */
package com.marcnuri.yakc;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.marcnuri.yakc.api.Api;
import com.marcnuri.yakc.config.Configuration;
import com.marcnuri.yakc.retrofit.KubernetesCallAdapterFactory;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import java.util.Optional;

/**
 * Created by Marc Nuri <marc@marcnuri.com> on 2020-04-11.
 */
public class KubernetesClient {

  private final Configuration configuration;
  private final Retrofit retrofit;

  public KubernetesClient() {
   this(Configuration.builder().build());
  }

  public KubernetesClient(Configuration configuration) {
    this.configuration = configuration;
    this.retrofit = initRetrofit();
  }

  private Retrofit initRetrofit() {
    final ObjectMapper objectMapper = initObjectMapper();
    return new Retrofit.Builder()
        .addCallAdapterFactory(KubernetesCallAdapterFactory.getInstance())
        .addConverterFactory(JacksonConverterFactory.create(objectMapper))
        .baseUrl(getUrl())
        .build();
  }

  public <T extends Api> T create(Class<T> clazz) {
    return retrofit.create(clazz);
  }

  private String getUrl() {
    final String defaultUrl = "http://localhost:8080"; // TODO -> Configuration to be retrieved from system
    return Optional.ofNullable(configuration.getUrl()).orElse(defaultUrl);
  }

  private static ObjectMapper initObjectMapper() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    objectMapper.configure(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE, false);
    objectMapper.registerModule(new JavaTimeModule());
    return objectMapper;
  }
}
