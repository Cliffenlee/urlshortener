package com.example.urlshortener.controller;

import com.example.urlshortener.data.model.Url;
import com.example.urlshortener.data.repository.UrlRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.util.Optional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UrlControllerTest {

    @Autowired
    WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;


    @InjectMocks
    private UrlController urlController;

    @Mock
    private UrlRepository urlRepository;

    private String ReactAppURL = "http://localhost:3000";

    private Url url;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(urlController).build();
        url = new Url(1, "https://www.producthunt.com/discussions/what-do-you-usually-do-at-weekends-to-refresh-your-mind", "JBHHoyML");
        this.urlRepository.save(url);
    }

    @Test
    public void shouldReturnLongUrlFromShortUrl() throws Exception {

        Mockito.when(urlRepository.findByCode("JBHHoyML")).thenReturn(Optional.of(url));

        System.out.println(urlController.getLongUrl("/JBHHoyML"));

        mockMvc.perform(MockMvcRequestBuilders.get("/JBHHoyML"))
                .andExpect(status().isFound())
                .andExpect(redirectedUrl("https://www.producthunt.com/discussions/what-do-you-usually-do-at-weekends-to-refresh-your-mind"));

    }

    @Test
    public void shouldReturnToShortenerWebsiteOnInvalidCode() throws Exception {
        Mockito.when(urlRepository.findByCode("hnhKJuDA")).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/hnhKJuDA"))
                .andExpect(status().isFound())
                .andExpect(redirectedUrl("http://localhost:3000"));
    }
}