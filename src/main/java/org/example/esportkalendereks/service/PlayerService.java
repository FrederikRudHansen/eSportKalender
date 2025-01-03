package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Player;
import org.example.esportkalendereks.repository.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepo PlayerRepository; // Dit repository, der kommunikerer med databasen

    // Valider spilleren mod databasen
    public boolean validatePlayer(String email, String password) {
        Player p = PlayerRepository.findByEmail(email); // Find spilleren i databasen med den givne email
        if (p != null && p.getPassword().equals(password)) { // Tjek om adgangskoden matcher
            return true; // Spilleren findes og adgangskoden matcher
        }
        return false; // Spilleren findes ikke eller adgangskoden er forkert
    }

    // Metode til at tjekke om spilleren findes i databasen, som kan bruges ved registrering
    public boolean isPlayerExists(String email) {
        return PlayerRepository.findByEmail(email) != null; // Returner true, hvis spilleren allerede findes
    }

    // Gem en ny spiller
    public void savePlayer(Player newPlayer) {
        PlayerRepository.save(newPlayer); // Gem spilleren i databasen
    }
}
