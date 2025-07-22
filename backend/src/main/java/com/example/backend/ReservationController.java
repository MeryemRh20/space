package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping
    public ResponseEntity<?> getAllReservations(@RequestParam(value = "userId", required = false) Integer userId) {
        try {
            if (userId != null) {
                logger.info("Fetching reservations for user ID: {}", userId);
                Integer count = reservationRepository.countByUserId(userId);
                logger.info("Found {} reservations for user ID: {}", count, userId);
                
                List<Reservation> reservations = reservationRepository.findByUserId(userId);
                return ResponseEntity.ok(reservations);
            } else {
                logger.info("Fetching all reservations");
                List<Reservation> reservations = reservationRepository.findAll();
                return ResponseEntity.ok(reservations);
            }
        } catch (Exception e) {
            logger.error("Error fetching reservations: ", e);
            return ResponseEntity.internalServerError().body("Error fetching reservations: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Integer id) {
        try {
            logger.info("Fetching reservation with ID: {}", id);
            return reservationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    logger.warn("Reservation not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
        } catch (Exception e) {
            logger.error("Error fetching reservation: ", e);
            return ResponseEntity.internalServerError().body("Error fetching reservation: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Map<String, Object> payload) {
        try {
            Reservation reservation = new Reservation();

            // Extract and set properties from the payload
            if (payload.get("userId") != null) {
                reservation.setUserId(Integer.parseInt(payload.get("userId").toString()));
            }
            if (payload.get("spaceId") != null && !payload.get("spaceId").toString().isEmpty()) {
                reservation.setSpaceId(Integer.parseInt(payload.get("spaceId").toString()));
            }
            if (payload.get("startTime") != null) {
                java.time.Instant instant = java.time.Instant.parse(payload.get("startTime").toString());
                reservation.setStartTime(java.sql.Timestamp.from(instant));
            }
            if (payload.get("endTime") != null) {
                java.time.Instant instant = java.time.Instant.parse(payload.get("endTime").toString());
                reservation.setEndTime(java.sql.Timestamp.from(instant));
            }
            if (payload.get("specialRequests") != null) {
                reservation.setSpecialRequests(payload.get("specialRequests").toString());
            }
            if (payload.get("packId") != null) {
                reservation.setPackId(Integer.parseInt(payload.get("packId").toString()));
            }

            // Always set status to pending for new reservations
            reservation.setStatus("pending");
            
            logger.info("Creating new reservation: {}", reservation);
            Reservation savedReservation = reservationRepository.save(reservation);
            logger.info("Created reservation with ID: {}", savedReservation.getId());
            
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            logger.error("Error creating reservation: ", e);
            return ResponseEntity.internalServerError().body("Error creating reservation: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
        try {
            logger.info("Updating reservation with ID: {}", id);
            
            Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

            if (payload.get("spaceId") != null && !payload.get("spaceId").toString().isEmpty()) {
                reservation.setSpaceId(Integer.parseInt(payload.get("spaceId").toString()));
            }
            if (payload.get("startTime") != null) {
                java.time.Instant instant = java.time.Instant.parse(payload.get("startTime").toString());
                reservation.setStartTime(java.sql.Timestamp.from(instant));
            }
            if (payload.get("endTime") != null) {
                java.time.Instant instant = java.time.Instant.parse(payload.get("endTime").toString());
                reservation.setEndTime(java.sql.Timestamp.from(instant));
            }
            if (payload.get("specialRequests") != null) {
                reservation.setSpecialRequests(payload.get("specialRequests").toString());
            }
            if (payload.get("packId") != null) {
                reservation.setPackId(Integer.parseInt(payload.get("packId").toString()));
            }
            if (payload.get("status") != null) {
                reservation.setStatus(payload.get("status").toString().toLowerCase());
            }

            Reservation updatedReservation = reservationRepository.save(reservation);
            logger.info("Updated reservation with ID: {}", updatedReservation.getId());
            
            return ResponseEntity.ok(updatedReservation);
        } catch (Exception e) {
            logger.error("Error updating reservation: ", e);
            return ResponseEntity.internalServerError().body("Error updating reservation: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer id) {
        try {
            logger.info("Deleting reservation with ID: {}", id);
            reservationRepository.deleteById(id);
            logger.info("Deleted reservation with ID: {}", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting reservation: ", e);
            return ResponseEntity.internalServerError().body("Error deleting reservation: " + e.getMessage());
        }
    }
}