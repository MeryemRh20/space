package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    @GetMapping("/type/{typeId}")
    public ResponseEntity<List<Activity>> getActivitiesByType(@PathVariable Integer typeId) {
        List<Activity> activities = activityRepository.findByActivityTypeIdOrderByCreatedAtDesc(typeId);
        return ResponseEntity.ok(activities);
    }
}
