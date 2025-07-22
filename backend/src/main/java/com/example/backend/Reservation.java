package com.example.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "space_id")
    private Integer spaceId;

    @Column(name = "start_time")
    private java.sql.Timestamp startTime;

    @Column(name = "end_time")
    private java.sql.Timestamp endTime;

    @Column(name = "special_requests")
    private String specialRequests;

    private Integer packId;
    private java.sql.Date date;
    private String status;

    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Integer getSpaceId() { return spaceId; }
    public void setSpaceId(Integer spaceId) { this.spaceId = spaceId; }
    public java.sql.Timestamp getStartTime() { return startTime; }
    public void setStartTime(java.sql.Timestamp startTime) { this.startTime = startTime; }
    public java.sql.Timestamp getEndTime() { return endTime; }
    public void setEndTime(java.sql.Timestamp endTime) { this.endTime = endTime; }
    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }
    public Integer getPackId() { return packId; }
    public void setPackId(Integer packId) { this.packId = packId; }
    public java.sql.Date getDate() { return date; }
    public void setDate(java.sql.Date date) { this.date = date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 