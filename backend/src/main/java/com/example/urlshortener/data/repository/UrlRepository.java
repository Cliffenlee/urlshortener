package com.example.urlshortener.data.repository;

import com.example.urlshortener.data.model.Url;
import org.springframework.data.repository.CrudRepository;

public interface UrlRepository extends CrudRepository<Url, Integer> {
}
