package com.example.urlshortener.data.repository;

import com.example.urlshortener.data.model.Url;
import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UrlRepository extends CrudRepository<Url, Integer> {

    Optional<Url> findByCode (String code);
}
