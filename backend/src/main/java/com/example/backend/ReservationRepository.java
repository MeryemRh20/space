package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query(value = "SELECT * FROM reservations WHERE user_id = :userId ORDER BY start_time DESC", nativeQuery = true)
    List<Reservation> findByUserId(@Param("userId") Integer userId);

    @Query(value = "SELECT * FROM reservations WHERE id = :id", nativeQuery = true)
    Reservation findReservationById(@Param("id") Integer id);

    @Query(value = "SELECT COUNT(*) FROM reservations WHERE user_id = :userId", nativeQuery = true)
    Integer countByUserId(@Param("userId") Integer userId);
} 