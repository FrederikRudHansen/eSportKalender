package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Player;
import org.example.esportkalendereks.model.player;
import org.example.esportkalendereks.repository.playerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private playerRepo playerRepository; // Dit repository, der kommunikerer med databasen

    // Valider spilleren mod databasen
    public boolean validatePlayer(String email, String password) {
        player p = playerRepository.findByEmail(email); // Find spilleren i databasen med den givne email
        if (p != null && p.getPassword().equals(password)) { // Tjek om adgangskoden matcher
            return true; // Spilleren findes og adgangskoden matcher
        }
        return false; // Spilleren findes ikke eller adgangskoden er forkert
    }

    // Metode til at tjekke om spilleren findes i databasen, som kan bruges ved registrering
    public boolean isPlayerExists(String email) {
        return playerRepository.findByEmail(email) != null; // Returner true, hvis spilleren allerede findes
    }

    // Gem en ny spiller
    public void savePlayer(Player newPlayer) {
        playerRepository.save(newPlayer); // Gem spilleren i databasen
    }
}
