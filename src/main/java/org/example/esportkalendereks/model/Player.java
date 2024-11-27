package org.example.esportkalendereks.model;

import jakarta.persistence.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(unique = true)
    String email;

    String password;
    int holdID;
    String spil;
    String navn;
    int alder;
    String præferencer;
    String resume;
    String billede;
    String nationalitet;
    String rank;

    public int getID() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getHoldID() {
        return holdID;
    }

    public void setHoldID(int holdID) {
        this.holdID = holdID;
    }

    public String getSpil() {
        return spil;
    }

    public void setSpil(String spil) {
        this.spil = spil;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public int getAlder() {
        return alder;
    }

    public void setAlder(int alder) {
        this.alder = alder;
    }

    public String getPræferencer() {
        return præferencer;
    }

    public void setPræferencer(String præferencer) {
        this.præferencer = præferencer;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public String getBillede() {
        return billede;
    }

    public void setBillede(String billede) {
        this.billede = billede;
    }

    public String getNationalitet() {
        return nationalitet;
    }

    public void setNationalitet(String nationalitet) {
        this.nationalitet = nationalitet;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}