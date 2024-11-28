package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Coach;
import org.example.esportkalendereks.repository.CoachRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoachService {

    @Autowired
    private CoachRepo coachRepository; // Dit repository, der kommunikerer med databasen

    // Valider coach mod databasen
    public boolean validateCoach(String email, String password) {
        Coach c = coachRepository.findByEmail(email); // Find coachen i databasen med den givne email
        if (c != null && c.getPassword().equals(password)) { // Tjek om adgangskoden matcher
            return true; // Coach findes og adgangskoden matcher
        }
        return false; // Coach findes ikke eller adgangskoden er forkert
    }

    // Metode til at tjekke om coachen allerede findes i databasen
    public boolean isCoachExists(String email) {
        return coachRepository.findByEmail(email) != null; // Returner true, hvis coachen allerede findes
    }

    // Gem en ny coach
    public void saveCoach(Coach newCoach) {
        coachRepository.save(newCoach); // Gem coachen i databasen
    }
}
