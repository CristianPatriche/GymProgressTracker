package com.gymprogresstracker.rest.webservices.restfulwebservices.Progress;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
import java.util.Objects;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Progress {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long day;
    private String username;
    private String description;
    private Date date;

    public Progress(String username, String description, Date date) {
        this.username = username;
        this.description = description;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Progress progress = (Progress) o;
        return day == progress.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(day);
    }

    @Override
    public String toString() {
        return "Progress{" +
                "day=" + day +
                ", username='" + username + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                '}';
    }
}
