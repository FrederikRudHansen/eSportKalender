package org.example.esportkalendereks.model;

import jakarta.persistence.*;

@Entity
public class Coach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String spil;
    private String navn;
    private int alder;
    private String præferencer;
    private String resume;
    private String billede;
    private String nationalitet;

    // Relation til Hold
    @OneToOne(mappedBy = "coach")
    private Hold hold;

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Hold getHold() {
        return hold;
    }

    public void setHold(Hold hold) {
        this.hold = hold;
    }
}