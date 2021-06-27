package com.example.urlshortener.controller;

import com.example.urlshortener.data.model.Error;
import com.example.urlshortener.data.model.Url;
import com.example.urlshortener.data.repository.UrlRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Optional;

@RestController
public class UrlController {

    @Autowired
    private UrlRepository urlRepository;


    // Shorten URL and add to url object to DB
    @CrossOrigin(origins = {"http://localhost:3000"})
    @PostMapping("/url")
    public ResponseEntity shortenUrl (@RequestBody HashMap body) {
        try {
            String longUrl = (String) body.get("long_url");
            String code = RandomStringUtils.random(8, true, true);
            Url url = new Url();
            url.setLongUrl(longUrl);
            url.setCode(code);
            return new ResponseEntity<Url>(urlRepository.save(url), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Error>(new Error(500, e.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get long URL from DB
    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping("/{code}")
    public RedirectView getLongUrl (@PathVariable String code) {
        System.out.println("im in");
        Optional<Url> url = urlRepository.findByCode(code);

        if(!url.isPresent()) {
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:3000");
            return redirectView;
        }

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(url.get().getLongUrl());
        return redirectView;
    }

    @GetMapping("/error")
    public RedirectView errorPage () {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000");
        return redirectView;
    }

}
