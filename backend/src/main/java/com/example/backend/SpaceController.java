package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {
    @Autowired
    private SpaceRepository spaceRepository;

    @GetMapping
    public List<Space> getAllSpaces() {
        return spaceRepository.findAll();
    }
} 