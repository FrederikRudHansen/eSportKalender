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
}