package org.example.esportkalendereks.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Hold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holdID;

    private String navn;
    private String rank;
    private String nationalitet;
    private int antal;
    private String Resume;
    private String spil;

    // Relation til Coach
    @OneToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    // Relation til Begivenheder
    @OneToMany(mappedBy = "hold", cascade = CascadeType.ALL)
    private List<Begivenheder> begivenheder;

    public int getHoldID() {
        return holdID;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getNationalitet() {
        return nationalitet;
    }

    public void setNationalitet(String nationalitet) {
        this.nationalitet = nationalitet;
    }

    public int getAntal() {
        return antal;
    }

    public void setAntal(int antal) {
        this.antal = antal;
    }

    public Coach getCoach() {
        return coach;
    }

    public void setCoach(Coach coach) {
        this.coach = coach;
    }

    public List<Begivenheder> getBegivenheder() {
        return begivenheder;
    }

    public void setBegivenheder(List<Begivenheder> begivenheder) {
        this.begivenheder = begivenheder;
    }

    public String getResume() {
        return Resume;
    }

    public void setResume(String resume) {
        Resume = resume;
    }

    public String getSpil() {
        return spil;
    }

    public void setSpil(String spil) {
        this.spil = spil;
    }
}